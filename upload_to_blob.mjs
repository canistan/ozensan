import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const token = "vercel_blob_rw_b3pcsGrSPWM0h0Uo_IYM2FjodZ1wobQG7Bzw8bmOlsLZgWR";
const productsPath = path.join(process.cwd(), 'src/data/products.json');
const publicDir = path.join(process.cwd(), 'public');

async function migrate() {
    console.log("Reading products.json...");
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    for (let p of products) {
        if (p.image && p.image.startsWith('/products/')) {
            const localPath = path.join(publicDir, p.image);
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
                    console.log(`Deleted local file: ${localPath}`);
                } catch (error) {
                    console.error(`Failed to upload ${p.slug}:`, error);
                }
            }
        }
    }

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
    console.log("Migration complete!");
}

migrate();
