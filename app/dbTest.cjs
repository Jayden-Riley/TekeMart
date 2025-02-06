const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://jaydendejong83:NYsfn4XYl3vWG7jN@cluster0.kmw7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your connection string if no .env file
const client = new MongoClient(uri);

async function testConnection() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect(); // Connect to MongoDB
    console.log("Successfully connected!");

    const db = client.db("Ecommerce"); // Replace with your database name
    const collection = db.collection("user"); // Replace with your collection name

    // Test a simple query
    const data = await collection.find({}).limit(5).toArray();
    console.log("Sample data:", data);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close(); // Close the connection
    console.log("Connection closed.");
  }
}

testConnection().catch((err) => console.error("Unhandled error:", err));
