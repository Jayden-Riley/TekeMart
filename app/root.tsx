import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router"; // Import necessary components and functions from react-router

import type { Route } from "./+types/root"; // Import Route type for type-checking
import stylesheet from "./app.css?url"; // Import the stylesheet for the app
import { useEffect, useState } from "react"; // Import useEffect hook for handling side effects
import toast, { Toaster } from "react-hot-toast"; // Import toast notification library
import { commitSession, getSession } from "session.server";
import { getUser } from "supabase.server";
import { Outlet } from "react-router";
import SearchBar from "./components/SearchBar";
import Footer from "./components/footer";
import { DoorOpen, ShoppingCart } from "lucide-react";

// Links function for adding external resources like stylesheets
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous", // Allow cross-origin access for fonts
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap", // Google Fonts Inter
  },
  { rel: "stylesheet", href: stylesheet }, // External stylesheet imported above
];

// Loader function to fetch session data and user info
export async function loader({ request }: Route.LoaderArgs) {
  // Get session from request headers
  let session = await getSession(request.headers.get("Cookie"));

  // Fetch the toast message from the session
  let toastMessage = session.get("toastMessage");

  // Fetch user data from Supabase (assuming the getUser function does this)
  let { user } = await getUser(request);
  let userEmail = user?.email || null; // Extract the user's email if available

  // Extract the username from the email
  let username = userEmail ? userEmail.split("@")[0] : null; // Get the part before '@'

  // Return the necessary data, including the toast message and username
  return data(
    { toastMessage, username },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

// Layout component that renders the HTML structure
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet" // External font stylesheet for Alegreya font
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />

        <Links />
      </head>
      <body className="bg-white  text-black">
        {children}
        <Footer />

        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { toastMessage, username } = loaderData;
  const location = useLocation();
  const excludedRoutes = ["/login", "/signup", "/"];
  const [showFilter, setShowFilter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the mobile menu

  useEffect(() => {
    if (!toastMessage) return;
    const { message, type } = toastMessage;
    if (type === "success") {
      toast.success(message);
    }
  }, [toastMessage]);

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState); // Toggle the mobile menu
  };

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && (
        <header className="flex justify-between items-center py-4 px-6 shadow-gray-500 shadow-sm relative">
          <Link to="/dashboard">
            <img src="/bird.jpg" alt="" className="h-14 w-14" />
          </Link>

          <div className="flex items-center space-x-4">
            <SearchBar />
            <div className="relative">
              <button
                className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                onClick={toggleFilter}
              >
                <i className="fas fa-filter text-gray-600"></i>
              </button>
              {showFilter && (
                <div className="absolute top-full w-44 mt-5 right-0 bg-white shadow-lg p-4 rounded-md z-50">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/phones"}>Phones</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/computers"}>Computers</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/electronics"}>Electronics</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/toys"}>Toys</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/games"}>Video Games</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                      <Link to={"/dashboard/petSupplies"}>Pet Supplies</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Icon for Mobile */}
          <button className="lg:hidden text-2xl" onClick={toggleMenu}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>

          {/* Cart and Profile Section for Large Devices */}
          <div className="hidden lg:flex items-center space-x-6">
            {username ? (
              <div className="flex items-center space-x-5">
                <Link to={`/dashboard/this`}>
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                    {username ? username.charAt(0).toUpperCase() : "U"}{" "}
                    {/* Display first letter of username */}
                  </div>
                </Link>
                <Link
                  to="/dashboard/cartItems"
                  className="flex items-center text-xl text-gray-700"
                >
                  <ShoppingCart size={24} />
                </Link>
                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="hover:bg-red-800 duration-500 bg-red-500 px-4 py-2 active:scale-[.98] transition ease-in-out rounded-md shadow-lg shadow-black"
                  >
                    Log Out
                  </button>
                </Form>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 transition ease-in-out duration-500 px-6 py-1 rounded-lg text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg z-50 transition-transform transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4">
              <Link
                to="/dashboard"
                className="text-3xl font-bold text-orange-500"
              >
                Betty's
              </Link>
              <button onClick={toggleMenu} className="text-2xl">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-4">
              {username ? (
                <div className="space-y-4">
                  <Link
                    to={`/dashboard/user`}
                    className="block text-xl text-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/cartItems"
                    className="block text-xl text-gray-700"
                  >
                    Cart
                  </Link>
                  <Form method="post" action="/logout">
                    <button
                      type="submit"
                      className="w-full text-xl text-white bg-red-500 py-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      <DoorOpen size={24} /> {/* Door icon */}
                      <span>Log Out</span>
                    </button>
                  </Form>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-xl text-white bg-green-600 py-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>
      )}

      <Outlet />
    </>
  );
}

// ErrorBoundary component to handle any errors that occur in the app
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"; // Default error message
  let details = "An unexpected error occurred."; // Default error details
  let stack: string | undefined; // Stack trace (if available)

  // Handle specific route errors (e.g., 404 Not Found)
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message; // Capture error message in development
    stack = error.stack; // Capture stack trace in development
  }

  // Render the error page with details
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
