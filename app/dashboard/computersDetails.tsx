import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { client } from "mongoClient.server"; // Assuming this is the correct import
import { ObjectId } from "mongodb";
import type { Route } from "./+types/phonesDetails";

// Interface defining the structure of an Electronics object
interface Electronics {
  description: string;
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId
}

// Server-side Loader function to fetch phone details
export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id } = params; // Extract the 'id' from the route parameters

  // Validate the ID to ensure it's a valid MongoDB ObjectId
  if (!id || !ObjectId.isValid(id)) {
    throw new Response("Invalid computer ID", { status: 400 }); // Return a 400 error if invalid
  }

  try {
    const db = client.db("Ecommerce"); // Connect to the "Ecommerce" database
    const collection = db.collection<Electronics>("computer"); // Access the "computer" collection

    // Find the computer document by its _id
    const computer = await collection.findOne({ _id: new ObjectId(id) });

    if (!computer) {
      throw new Response("Computer not found", { status: 404 }); // Return a 404 error if not found
    }

    return computer; // Return the computer data
  } catch (error) {
    console.error("Error fetching computer details:", error);
    throw new Response("Internal server error", { status: 500 }); // Return a 500 error for other errors
  }
};

const ComputerDetails = () => {
  const [addedToCart, setAddedToCart] = useState(false); // State to track "Add to Cart" button change
  const computer = useLoaderData<Electronics>(); // Access data fetched by the loader function

  const closeModal = () => {
    window.history.back(); // Navigate back to the previous page
  };

  const addToCart = () => {
    // Create a cart item object
    const cartItem = {
      _id: computer._id,
      image: computer.image,
      title: computer.title,
      price: computer.price,
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
      {/* Computer Card (Displayed initially) */}
      <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm sm:max-w-md md:max-w-lg my-8">
        <div className="w-full h-48 sm:h-56 md:h-60 mb-4">
          <img
            src={computer.image}
            alt={computer.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <h2 className="text-center font-medium text-base sm:text-lg md:text-xl mb-2">
          {computer.title}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-4">
          Ksh {computer.price}
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
            {computer.title}
          </h2>
          <img
            src={computer.image}
            alt={computer.title}
            className="w-full h-48 sm:h-56 md:h-60 object-contain rounded-md mb-4"
          />
          <p className="text-gray-600 mb-2 font-bold text-sm sm:text-base">
            <span>Price:</span> Ksh {computer.price}
          </p>
          {/* Conditionally render description if available */}
          {computer.description && (
            <p className="text-gray-700 mb-4 font-semibold text-sm sm:text-base">
              <span className="font-bold ">Description: </span>
              {computer.description}
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

export default ComputerDetails;
