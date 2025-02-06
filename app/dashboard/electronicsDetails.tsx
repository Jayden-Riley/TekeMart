import { ObjectId } from "mongodb";
import { client } from "mongoClient.server";
import type { Route } from "./+types/phonesDetails"; // Assuming this type definition is correct
import { useLoaderData } from "react-router";
import { useState } from "react";

// Interface for Electronic details
interface Electronics {
  description: string;
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId
}

// Loader function to fetch electronic details based on ID from URL params
export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id } = params; // Extract the 'id' from the route parameters

  // Validate the ID to ensure it's a valid MongoDB ObjectId
  if (!id || !ObjectId.isValid(id)) {
    throw new Response("Invalid or missing electronic ID", { status: 400 });
  }

  try {
    const db = client.db("Ecommerce"); // Connect to the "Ecommerce" database
    const collection = db.collection<Electronics>("electronics"); // Access the "electronics" collection

    // Find the electronic document by its _id
    const electronic = await collection.findOne({ _id: new ObjectId(id) });

    if (!electronic) {
      throw new Response("Electronic not found", { status: 404 });
    }

    return electronic; // Return the electronic data
  } catch (error) {
    console.error("Error fetching electronic details:", error);
    throw new Response("Internal server error", { status: 500 });
  }
};

// ElectronicDetails Component
const ElectronicDetails = () => {
  const [addedToCart, setAddedToCart] = useState(false); // State to track "Add to Cart" button change
  const electronic = useLoaderData<Electronics>(); // Access data fetched by the loader function

  const closeModal = () => {
    window.history.back(); // Navigate back to the previous page
  };

  const addToCart = () => {
    // Create a cart item object
    const cartItem = {
      _id: electronic._id,
      image: electronic.image,
      title: electronic.title,
      price: electronic.price,
    };

    // Get existing cart items from localStorage or create an empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add the new item to the cart
    currentCart.push(cartItem);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    setAddedToCart(true); // Update the button state
  };

  return (
    <>
      {/* Electronic Card (Displayed initially) */}
      <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm sm:max-w-md md:max-w-lg my-8">
        <div className="w-full h-48 sm:h-56 md:h-60 mb-4">
          <img
            src={electronic.image}
            alt={electronic.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <h2 className="text-center font-medium text-base sm:text-lg md:text-xl mb-2">
          {electronic.title}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-4">
          Ksh {electronic.price}
        </p>
      </div>

      {/* Modal for detailed view (Overlay) */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8"
        onClick={closeModal} // Close modal when clicking the backdrop
      >
        <div
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-10/12 md:w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          {/* Close Button (inside modal) */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full"
          >
            X
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            {electronic.title}
          </h2>
          <img
            src={electronic.image}
            alt={electronic.title}
            className="w-full h-48 sm:h-56 md:h-60 object-contain rounded-md mb-4"
          />
          <p className="text-gray-600 mb-2 font-bold text-sm sm:text-base">
            <span>Price:</span> Ksh {electronic.price}
          </p>
          {/* Conditionally render description if available */}
          {electronic.description && (
            <p className="text-gray-700 mb-4 font-semibold text-sm sm:text-base">
              <span className="font-bold ">Description: </span>
              {electronic.description}
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 flex items-center justify-center w-full sm:w-auto"
            disabled={addedToCart} // Disable button after adding to cart
          >
            {/* Change button text and icon after adding to cart */}
            {addedToCart ? (
              <>
                <span className="mr-2">Added to Cart</span>
                <i className="fas fa-cart-plus"></i>
              </>
            ) : (
              <>
                <span className="mr-2">Add to Cart</span>
                <i className="fas fa-cart-plus"></i>
              </>
            )}
          </button>

          {/* Back to List Button */}
          <button
            onClick={closeModal}
            className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 w-full sm:w-auto hover:bg-red-700 active:scale-[.98] transition duration-500"
          >
            Back to list
          </button>
        </div>
      </div>
    </>
  );
};

export default ElectronicDetails;
