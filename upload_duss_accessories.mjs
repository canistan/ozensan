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

const productsPath = path.join(process.cwd(), 'src/data/products.json');
const rawSawsPath = path.join(process.cwd(), 'raw_duss_accessories.json');
const tempDir = path.join(process.cwd(), 'public/temp_duss_accessories');

async function processDuss() {
    console.log("Reading raw_duss_accessories.json...");
    const rawData = fs.readFileSync(rawSawsPath, 'utf8');
    const rawProducts = JSON.parse(rawData);

    console.log("Reading existing products.json...");
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    for (let p of rawProducts) {
        if (p.image) {
            const localPath = path.join(process.cwd(), p.image);
            if (fs.existsSync(localPath)) {
                console.log(`Uploading ${p.slug}...`);
                try {
                    const fileData = fs.readFileSync(localPath);
                    const fileName = path.basename(localPath);
                    
                    const blob = await put(fileName, fileData, {
                        access: 'public',
                        token: token,
                    });
                    
                    p.image = blob.url;
                    console.log(`Success! URL: ${blob.url}`);
                    
                    // Delete local file
                    fs.unlinkSync(localPath);
                } catch (error) {
                    console.error(`Failed to upload ${p.slug}:`, error);
                }
            }
        }
        // Check if product already exists
        const existingIndex = products.findIndex(ext => ext.slug === p.slug);
        if (existingIndex !== -1) {
            // Merge solutions
            const mergedSolutions = new Set([...products[existingIndex].solutions, ...p.solutions]);
            products[existingIndex].solutions = Array.from(mergedSolutions);
            // Optionally update image if it changed
            if (p.image.startsWith('http')) {
                products[existingIndex].image = p.image;
            }
        } else {
            products.push(p);
        }
    }

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
    console.log("Products appended and saved to products.json!");
    
    // Clean up empty directory
    if (fs.existsSync(tempDir)) {
        try {
            fs.rmdirSync(tempDir);
        } catch(e) {}
    }
}

processDuss();
