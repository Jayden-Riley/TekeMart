import { ObjectId } from "mongodb";
import { client } from "mongoClient.server";
import type { Route } from "./+types/phonesDetails"; // Make sure this path is correct
import { useLoaderData } from "react-router";
import { useState } from "react";

// Interface for Video Game details
interface VideoDetails {
  description: string;
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId
}

// Loader function to fetch video game details
export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id } = params; // Extract the 'id' from the route parameters

  // Validate the ID to ensure it's a valid MongoDB ObjectId
  if (!id || !ObjectId.isValid(id)) {
    return new Response("Invalid video game ID", { status: 400 }); // Return a 400 error if invalid.  Using `return` here instead of `throw` because it's within an async function.
  }

  try {
    const db = client.db("Ecommerce"); // Connect to the "Ecommerce" database
    const collection = db.collection<VideoDetails>("videoGames"); // Access the "videoGames" collection

    const game = await collection.findOne({ _id: new ObjectId(id) }); // Find the game by ID

    if (!game) {
      return new Response("Video game not found", { status: 404 }); // Return a 404 error if not found. Using `return` here instead of `throw` because it's within an async function.
    }

    return game; // Return the video game data
  } catch (error) {
    console.error("Error fetching video game details:", error);
    return new Response("Internal server error", { status: 500 }); // Return a 500 error. Using `return` here instead of `throw` because it's within an async function.
  }
};

// VideoGamesDetails Component
const VideoGamesDetails = () => {
  const [addedToCart, setAddedToCart] = useState(false); // State to track "Add to Cart" button change
  const video = useLoaderData<VideoDetails>(); // Access data fetched by the loader

  const closeModal = () => {
    window.history.back(); // Go back to the previous page
  };

  const addToCart = () => {
    const cartItem = {
      _id: video._id,
      image: video.image,
      title: video.title,
      price: video.price,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(currentCart));

    setAddedToCart(true); // Update button state
  };

  return (
    <>
      {/* Video Game Card (Initial View) */}
      <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm sm:max-w-md md:max-w-lg my-8">
        <div className="w-full h-48 sm:h-56 md:h-60 mb-4">
          <img
            src={video.image}
            alt={video.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <h2 className="text-center font-medium text-base sm:text-lg md:text-xl mb-2">
          {video.title}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-4">
          Ksh {video.price}
        </p>
      </div>

      {/* Detailed View Modal (Overlay) */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8"
        onClick={closeModal} // Close on backdrop click
      >
        <div
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-10/12 md:w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
        >
          {/* Close Button (in Modal) */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full"
          >
            X
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-4">{video.title}</h2>
          <img
            src={video.image}
            alt={video.title}
            className="w-full h-48 sm:h-56 md:h-60 object-contain rounded-md mb-4"
          />
          <p className="text-gray-600 mb-2 font-bold text-sm sm:text-base">
            <span>Price:</span> Ksh {video.price}
          </p>
          {/* Conditionally render description */}
          {video.description && (
            <p className="text-gray-700 mb-4 font-semibold text-sm sm:text-base">
              <span className="font-bold">Description:</span>{" "}
              {video.description}
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 flex items-center justify-center w-full sm:w-auto"
            disabled={addedToCart} // Disable after adding
          >
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

export default VideoGamesDetails;
