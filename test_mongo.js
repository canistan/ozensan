require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("URI starting with:", uri.substring(0, 30) + "...");
    await mongoose.connect(uri);
    console.log("Connected successfully to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("Error connecting:", err.message);
    process.exit(1);
  }
}
test();
