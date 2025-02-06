import { Link, useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  // Check if the current path is either login or signup
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/"
  ) {
    return null; // Don't render footer on login/signup pages
  }

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-orange-700">
              About Us
            </h4>
            <p className="text-sm text-gray-400">
              At Betty's, we offer the best products and services. Check out our
              range of amazing items and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-orange-700">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard/phones"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Phones
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/computers"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Computers
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/electronics"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/toys"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Toys
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/games"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Video Games
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/petSupplies"
                  className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                >
                  Pet Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-700">
              Connect with Us
            </h4>
            <div className="flex space-x-4 mb-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-600"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-400"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-pink-600"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-700"
              >
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link
                to="https://github.com"
                target="_blank"
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fab fa-github"></i>
              </Link>
            </div>

            {/* Optional Newsletter */}
            <div className="mt-4">
              <h5 className="text-sm font-semibold">
                Subscribe to our newsletter
              </h5>
              <form className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-l-md w-2/3 text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Betty's. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
