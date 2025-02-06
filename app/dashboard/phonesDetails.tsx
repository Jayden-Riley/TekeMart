import { ObjectId } from "mongodb";
import { client } from "mongoClient.server";
import type { Route } from "./+types/phonesDetails";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";

// Interface for Phone details
interface Phone {
  description: string;
  image: string;
  title: string;
  price: number;
  _id: ObjectId; // MongoDB ObjectId
}

// Loader function using Route.LoaderArgs
export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id } = params;

  // Ensure ID is valid MongoDB ObjectId
  if (!id || !ObjectId.isValid(id)) {
    throw new Response("Invalid or missing phone ID", { status: 400 });
  }

  try {
    // Ensure the client is connected
    const db = client.db("Ecommerce");
    const collection = db.collection<Phone>("phones");

    // Fetch phone details by ID
    const phone = await collection.findOne({ _id: new ObjectId(id) });

    if (!phone) {
      // Handle case when phone is not found
      throw new Response("Phone not found", { status: 404 });
    }

    // Return the phone data, ensuring the _id is converted to string for frontend
    return phone;
  } catch (error) {
    console.error("Error fetching phone details:", error);
    // Handle unexpected errors gracefully
    throw new Response("Internal server error", { status: 500 });
  }
};

// PhoneDetails Component

const PhoneDetails = () => {
  const [addedToCart, setAddedToCart] = useState(false); // State to track if the item is added to the cart
  const phone = useLoaderData<Phone>(); // Use loader data to get phone details
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to close the modal and navigate back
  const closeModal = () => {
    navigate(-1); // This will go back to the previous page
  };

  // Function to handle adding the item to the cart
  const addToCart = () => {
    // Create a cart item based on the phone data
    const cartItem = {
      _id: phone._id.toString(), // Convert MongoDB ObjectId to string
      image: phone.image,
      title: phone.title,
      price: phone.price,
    };

    // Retrieve the current cart from localStorage or initialize it as an empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add the new item to the cart
    currentCart.push(cartItem);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Change the button text to "Added to Cart" by updating the state
    setAddedToCart(true);
  };

  return (
    <>
      {/* Phone Card */}
      <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center max-w-sm sm:max-w-md md:max-w-lg my-8">
        <div className="w-full h-48 sm:h-56 md:h-60 mb-4">
          <img
            src={phone.image}
            alt={phone.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <h2 className="text-center font-medium text-base sm:text-lg md:text-xl mb-2">
          {phone.title}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-4">
          Ksh {phone.price}
        </p>
      </div>

      {/* Modal for detailed view */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8"
        onClick={closeModal}
      >
        <div
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-11/12 sm:w-10/12 md:w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full"
          >
            X
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{phone.title}</h2>
          <img
            src={phone.image}
            alt={phone.title}
            className="w-full h-48 sm:h-56 md:h-60 object-contain rounded-md mb-4"
          />
          <p className="text-gray-600 mb-2 font-bold text-sm sm:text-base">
            <span className="">Price:</span> Ksh {phone.price}
          </p>
          {phone.description && (
            <p className="text-gray-700 mb-4 font-semibold text-sm sm:text-base">
              <span className="font-bold ">Description: </span>
              {phone.description}
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 flex items-center justify-center w-full sm:w-auto"
            disabled={addedToCart} // Disable the button once the item is added
          >
            {addedToCart ? (
              <>
                <span className="mr-2">Added to Cart</span>
                <i className="fas fa-cart-plus"></i>{" "}
              </>
            ) : (
              <>
                <span className="mr-2">Add to Cart</span>
                <i className="fas fa-cart-plus"></i>{" "}
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

export default PhoneDetails;
