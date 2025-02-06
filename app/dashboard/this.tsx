import { MongoClient } from "mongodb";
import { useState, useEffect } from "react";
import type { ActionFunction } from "react-router";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router";

// Loader function to fetch user data based on email
export async function loader({ request }: { request: Request }) {
  // MongoDB connection details (store these securely, e.g., in environment variables)
  const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb+srv://jaydendejong83:NYsfn4XYl3vWG7jN@cluster0.kmw7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Use environment variable if available
  const DB_NAME = process.env.DB_NAME || "Ecommerce"; // Use environment variable if available
  const COLLECTION_NAME = process.env.COLLECTION_NAME || "user"; // Use environment variable if available
  const url = new URL(request.url);
  const email = url.searchParams.get("email"); // Get email from query parameter

  // If no email is provided, you might want to handle this differently, e.g., redirect to login
  if (!email) {
    return null; // Or throw new Response("Unauthorized", { status: 401 });
  }

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const user = await collection.findOne({ email });

    await client.close(); // Close the client connection after use

    if (!user) {
      return null; // Or throw new Response("User not found", { status: 404 });
    }

    return { user };
  } catch (error) {
    console.error("Error in loader:", error);
    return null; // Or throw new Response("Internal Server Error", { status: 500 });
  }
}

// Action function to handle profile update form submission
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData(); // Use formData for file uploads if needed
  const updatedData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    // ... other fields you want to update
  };
  // MongoDB connection details (store these securely, e.g., in environment variables)
  const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb+srv://jaydendejong83:NYsfn4XYl3vWG7jN@cluster0.kmw7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Use environment variable if available
  const DB_NAME = process.env.DB_NAME || "Ecommerce"; // Use environment variable if available
  const COLLECTION_NAME = process.env.COLLECTION_NAME || "user"; // Use environment variable if available
  const email = updatedData.email;

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.updateOne({ email }, { $set: updatedData });

    await client.close();

    if (result.modifiedCount === 0) {
      return { errors: { update: "User not found or not updated" } };
    }

    return redirect("/dashboard/this?success=true"); // Redirect with a success query parameter
  } catch (error) {
    console.error("Error in action:", error);
    return { errors: { update: "Failed to update profile" } };
  }
};

// ProfilePage component
export default function ProfilePage() {
  const data = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (actionData?.errors) {
      setIsUpdating(false); // Reset loading state on error
    }
    if (new URLSearchParams(window.location.search).get("success")) {
      setIsUpdating(false);
      // Optionally show a success toast or notification here
    }
  }, [actionData]);

  const handleSubmit = () => {
    setIsUpdating(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Edit Your Profile
      </h1>

      {/* Display User Data (only if data is available) */}
      {data?.user && (
        <div className="mb-6 space-y-4">
          <p className="text-gray-600">
            <strong>Name:</strong> {data.user.firstName} {data.user.lastName}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {data.user.email}
          </p>
        </div>
      )}

      <Form method="post" className="space-y-6" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            defaultValue={data?.user?.firstName || ""}
            placeholder="Enter your first name"
            className="mt-2 w-full p-3 border bg-gray-300 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            defaultValue={data?.user?.lastName || ""}
            placeholder="Enter your last name"
            className="mt-2 w-full p-3 border bg-gray-300 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={data?.user?.email || ""}
            placeholder="Enter your email"
            className="mt-2 w-full p-3 bg-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full py-3 rounded-md text-white font-semibold ${
              isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </Form>

      {/* Error Messages */}
      {actionData?.errors && (
        <div className="text-red-500 mt-4">
          <ul>
            {Object.values(actionData.errors).map((error, index) => (
              <li key={index} className="text-sm">
                {error as string}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
