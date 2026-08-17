import { list, del } from '@vercel/blob';
import { config } from 'dotenv';
config();

const token = process.env.BLOB_READ_WRITE_TOKEN;

async function manage() {
  console.log("Listing blobs...");
  const { blobs } = await list({ token });
  
  for (const blob of blobs) {
    if (blob.pathname === 'shared-docs/TICAB-Turkce.pdf') {
      console.log(`  -> Deleting old PDF: ${blob.pathname}...`);
      await del(blob.url, { token });
      console.log("  -> Deleted!");
    }
  }
  
  console.log("Done.");
}

manage().catch(console.error);
