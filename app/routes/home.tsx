import { Link } from "react-router-dom";

export function meta() {
  return [
    { title: "Welcome to TekeMall" },
    {
      name: "description",
      content:
        "Step into Betty's – your gateway to premium products and a delightful experience!",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400 flex flex-col justify-center items-center text-center text-white px-6">
      {/* Header */}
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 whitespace-nowrap overflow-hidden border-r-4 pr-2 animate-typing visibility-hidden">
        Welcome to <span className="text-yellow-500">TekeMall</span>
      </h1>

      {/* Paragraph without typing animation */}
      <p className="text-lg sm:text-xl font-light mb-8 px-4 sm:px-0">
        Your one-stop shop for premium products, from pet care and electronics
        to phones and so much more. Explore our wide collection and discover
        something for everyone!
      </p>

      {/* Call-to-action */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
        <Link
          to="/signup"
          className="px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 active:scale-[.98]"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition duration-300 active:scale-[.98]"
        >
          Log In
        </Link>
      </div>

      {/* Highlight Section */}
      <div className="mt-16 space-y-8 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Why Shop at TekeMall?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">Premium Products</h3>
            <p className="text-sm text-white/90">
              Handpicked, high-quality items designed to keep your pets happy
              and healthy.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">Affordable Prices</h3>
            <p className="text-sm text-white/90">
              Competitive pricing without compromising on quality.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold mb-3">Fast Shipping</h3>
            <p className="text-sm text-white/90">
              Quick and reliable delivery so your pets get what they need, when
              they need it.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
