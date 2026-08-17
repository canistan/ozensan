/**
 * PDF dosyalarını Vercel Blob'a yükler.
 * 
 * Kullanım:
 *   node upload_pdf.mjs public/shared-docs/TICAB-2026-Turkce.pdf
 *   node upload_pdf.mjs public/shared-docs/TICAB-2026-Turkce.pdf "TICAB 2026 Türkçe Katalog"
 * 
 * Yüklenen PDF'in blob URL'si shared-docs.json dosyasına kaydedilir.
 */
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { config } from 'dotenv';
config();

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("HATA: BLOB_READ_WRITE_TOKEN ortam değişkeni bulunamadı!");
  process.exit(1);
}

const filePath = process.argv[2];
const customName = process.argv[3]; // opsiyonel özel isim

if (!filePath) {
  console.error("Kullanım: node upload_pdf.mjs <pdf-dosya-yolu> [özel-isim]");
  console.error("Örnek:    node upload_pdf.mjs public/shared-docs/TICAB-2026-Turkce.pdf");
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`HATA: Dosya bulunamadı: ${filePath}`);
  process.exit(1);
}

const configPath = path.join(process.cwd(), 'shared-docs.json');

async function run() {
  try {
    const fileName = path.basename(filePath);
    const slug = fileName.replace(/\.pdf$/i, '');
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
    const name = customName || slug.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    console.log(`📄 Dosya: ${fileName} (${sizeMB} MB)`);
    console.log(`📤 Vercel Blob'a yükleniyor...`);

    const fileBuffer = fs.readFileSync(filePath);

    const blob = await put(`shared-docs/${fileName}`, fileBuffer, {
      access: 'public',
      token: token,
      contentType: 'application/pdf',
    });

    console.log(`✅ Yükleme başarılı!`);
    console.log(`🔗 Blob URL: ${blob.url}`);

    // shared-docs.json'a kaydet
    let docs = [];
    if (fs.existsSync(configPath)) {
      docs = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    // Aynı slug varsa güncelle, yoksa ekle
    const existingIndex = docs.findIndex(d => d.slug === slug);
    const docEntry = {
      slug,
      name,
      fileName,
      blobUrl: blob.url,
      sizeMB,
      uploadedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      docs[existingIndex] = docEntry;
      console.log(`📝 "${slug}" güncellendi.`);
    } else {
      docs.push(docEntry);
      console.log(`📝 "${slug}" eklendi.`);
    }

    fs.writeFileSync(configPath, JSON.stringify(docs, null, 2));
    console.log(`💾 shared-docs.json güncellendi.`);
    console.log(`\n🌐 Paylaşım linki: https://www.ozensanas.com/docs/${slug}`);

  } catch (e) {
    console.error("❌ Hata:", e);
    process.exit(1);
  }
}

run();
