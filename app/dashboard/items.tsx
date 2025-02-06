import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

// Interface for CartItem objects
interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string; // Image URL for the product
}

// CartPage component - Displays and manages the user's shopping cart
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        // Add try-catch for parsing errors
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // Handle error, e.g., clear invalid cart data
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Update localStorage whenever the cartItems state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems)); // No need to check cartItems.length here
  }, [cartItems]);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    // Ensure price and quantity are valid numbers before calculation
    const validPrice = !isNaN(item.price) && item.price > 0 ? item.price : 0;
    const validQuantity =
      !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 0;
    return total + validPrice * validQuantity;
  }, 0);

  // Function to handle deleting an item from the cart
  const handleDelete = (_id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
  };

  // Function to handle changes in item quantity
  const handleQuantityChange = (_id: string, change: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) } // Ensure quantity doesn't go below 1
        : item
    );
    setCartItems(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-orange-500 mb-6">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {/* Map through cartItems to display each item */}
            {cartItems.map((item) => (
              <div
                key={item._id} // Key is essential for React to efficiently update the list
                className="flex flex-col sm:flex-row items-center justify-between bg-white bg-opacity-20 p-4 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-medium text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-200">
                      Ksh {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="text-white bg-gray-700 px-2 py-1 rounded-md hover:bg-gray-600"
                    >
                      -
                    </button>
                    <p className="text-white">Qty: {item.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="text-white bg-gray-700 px-2 py-1 rounded-md hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-white hover:text-red-500 transition"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}

            {/* Display the total price */}
            <div className="flex justify-between items-center text-white mt-4">
              <h2 className="text-2xl sm:text-3xl font-medium">Total:</h2>
              <p className="text-2xl sm:text-3xl font-semibold">
                Ksh {totalPrice.toLocaleString()}{" "}
                {/* Format the number with commas */}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-white text-lg">
            Your cart is empty. Start adding items!
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
