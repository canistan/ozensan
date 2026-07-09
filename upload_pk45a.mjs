import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { config } from 'dotenv';
config();

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
    console.error("HATA: BLOB_READ_WRITE_TOKEN ortam değişkeni bulunamadı.");
    process.exit(1);
}

async function run() {
    try {
        const fetchUrl = "https://www.duss.com/files/public/products/_anwendungsbereiche/_gro%C3%9F/PK45A_big_1.jpg";
        console.log("Downloading from", fetchUrl);
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to fetch image: " + res.statusText);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        console.log("Uploading to Vercel Blob...");
        const blob = await put('duss-pk-45-a-breaker-app.jpg', buffer, {
            access: 'public',
            token: token
        });
        
        console.log("Upload successful! URL: " + blob.url);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
