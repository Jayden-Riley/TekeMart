// server.ts (or app.ts)
import { MongoClient, ObjectId } from "mongodb";
import http from "http";
import url from "url";

const client = new MongoClient("mongodb://localhost:27017");
const dbName = "Ecommerce"; // Your MongoDB database name
let db: any;

client
  .connect()
  .then(() => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const server = http.createServer(async (req, res) => {
  const { method, url: reqUrl } = req;
  if (!reqUrl) {
    res.writeHead(400);
    return res.end("Invalid URL");
  }
  const parsedUrl = url.parse(reqUrl, true);

  // Use the /profile endpoint for fetching and updating user data
  if (parsedUrl.pathname === "/profile" && method === "GET") {
    const userId = parsedUrl.query.id as string;

    if (!userId) {
      res.writeHead(400);
      return res.end("User ID required");
    }

    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      if (user) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(user));
      }
      res.writeHead(404);
      return res.end("User not found");
    } catch (error) {
      res.writeHead(500);
      return res.end("Error fetching user data");
    }
  }

  if (parsedUrl.pathname === "/profile" && method === "PUT") {
    const userId = parsedUrl.query.id as string;

    if (!userId) {
      res.writeHead(400);
      return res.end("User ID required");
    }

    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", async () => {
      try {
        const updatedData = JSON.parse(data);
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: updatedData,
          }
        );
        res.writeHead(200);
        res.end("Profile updated successfully");
      } catch (error) {
        res.writeHead(500);
        res.end("Error updating profile");
      }
    });
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5173");
});
