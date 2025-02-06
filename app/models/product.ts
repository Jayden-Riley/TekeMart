// import { client } from "mongoClient.server";
import { client } from "mongoClient.server";
import { ObjectId } from "mongodb";

interface Computers {
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId as a string
}
interface Phone {
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId
}

interface Electronics {
  image: string;
  title: string;
  price: number;
  _id: ObjectId;
}
interface Toys {
  image: string;
  title: string;
  price: number;
  _id: ObjectId;
}
interface VideoGames {
  image: string;
  title: string;
  price: number;
  _id: ObjectId;
}
interface Pets {
  image: String;
  title: String;
  price: Number;
  _id: ObjectId;
}
interface User {
  userName: string;
  email: string;
  phone: string;
  password: string;
}
let database = client.db("Ecommerce"); // Access the "dashboard" database
// let productsCollection = database.collection<Product>("dashboard"); // Get the "products" collection from the database
let phonesCollection = database.collection<Phone>("phones");

let computersCollection = database.collection<Computers>("computer");
// Get the "computers" collection from the database
let electronicsCollection = database.collection<Electronics>("electronics");
let toysCollection = database.collection<Toys>("toys");
let videoGamesCollection = database.collection<VideoGames>("videoGames");
let petCollection = database.collection<Pets>("petSupplies");
let userCollection = database.collection<User>("user");
// get phones from the db
export async function getPhones(): Promise<Phone[]> {
  return await phonesCollection.find().toArray();
}
// delete phones from the db
export async function deletePhones(id: string) {
  return phonesCollection.deleteOne({ _id: new ObjectId(id) }); // Delete the product by its ObjectId
}

// get computers from the db
export async function getComputers(): Promise<Computers[]> {
  return await computersCollection.find().toArray();
}
// get computer by id

export async function getComputerById(id: string): Promise<Computers | null> {
  return await computersCollection.findOne({ _id: new ObjectId(id) });
}

// update computer to the db

export async function updateComputer(
  id: string,
  updatedComputer: Computers
): Promise<void> {
  await computersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedComputer }
  );
}
// delete computer from the db

export async function deleteComputer(id: string) {
  return computersCollection.deleteOne({ _id: new ObjectId(id) }); // Delete the product by its ObjectId
}

// get electronics from the db
export async function getElectronics(): Promise<Electronics[]> {
  return await electronicsCollection.find().toArray();
}

// get toys from the db
export async function getToys(): Promise<Toys[]> {
  return await toysCollection.find().toArray();
}

// get videoGames from the db
export async function getVideoGames(): Promise<VideoGames[]> {
  return await videoGamesCollection.find().toArray();
}

// get petSupplies from the db
export async function getPetSupplies(): Promise<Pets[]> {
  return await petCollection.find().toArray();
}

// adding a user to the db
export async function addUser(user: User): Promise<User> {
  await userCollection.insertOne(user);
  return user;
}
// get user b their id

export async function getUserById(id: string): Promise<User | null> {
  return await userCollection.findOne({ _id: new ObjectId(id) });
}

// updating a user in the db

export async function updateUser(id: string, updatedUser: User): Promise<void> {
  await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedUser }
  );
}
