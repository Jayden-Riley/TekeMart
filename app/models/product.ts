import { client } from "mongoClient.server";

interface Users {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
let database = client.db("dashboard"); // Access the "dashboard" database
// let productsCollection = database.collection<Product>("dashboard"); // Get the "products" collection from the database
let usersCollection = database.collection<Users>("customers");

// Add a new customer to the "customers" collection
export async function addCustomer(data: any) {
  return usersCollection.insertOne(data); // Insert the new customer data into the "customers" collection
}
