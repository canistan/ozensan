import { list } from '@vercel/blob';
import { config } from 'dotenv';
config();

const token = process.env.BLOB_READ_WRITE_TOKEN;

async function run() {
  const { blobs } = await list({ token });
  console.log(blobs.map(b => b.pathname).filter(p => p.toLowerCase().includes('ticab')));
}
run();
