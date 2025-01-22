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
import { useEffect } from "react"; // Import useEffect hook for handling side effects
import toast, { Toaster } from "react-hot-toast"; // Import toast notification library
import { commitSession, getSession } from "session.server";
import { getUser } from "supabase.server";
import { Outlet } from "react-router";

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
  let toastMessage = session.get("toastMessage"); // Fetch the toast message from the session

  // Fetch user data from Supabase (assuming the getUser function does this)
  let { user } = await getUser(request);
  let userEmail = user?.email || null; // Extract the user's email if available

  // Extract the username from the email
  let username = userEmail ? userEmail.split("@")[0] : null; // Get the part before '@'

  return data(
    { toastMessage, username }, // Return username instead of userEmail
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
        <Links />
      </head>
      <body className="bg-white  text-black">
        {children}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Section */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-orange-700">
                  About Us
                </h4>
                <p className="text-sm text-gray-400">
                  At Betty's, we offer the best products and services. Check out
                  our range of amazing items and services.
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
                      to="/phones"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/computer"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Computer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cloathing"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Cloathing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/toys"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Toys
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/videoGames"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Video Games
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jewelry"
                      className="text-gray-400 hover:text-orange-500 duration-500 ease-in-out"
                    >
                      Jewelry
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/petSupplies"
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
              <p>
                &copy; {new Date().getFullYear()} Betty's. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  let { toastMessage, username } = loaderData; // Destructure data returned by the loader

  const location = useLocation(); // Access the current route
  const excludedRoutes = ["/login", "/signup"]; // Routes where header should not appear

  // useEffect to handle displaying toast notifications when data changes
  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    let { message, type } = toastMessage; // Extract message and type

    // Display toast based on message type
    switch (type) {
      case "success": {
        toast.success(message); // Show success toast
      }
    }
  }, [toastMessage]); // Re-run when toastMessage changes

  return (
    <>
      {/* Conditionally render the header only if the current route is not in the excludedRoutes */}
      {!excludedRoutes.includes(location.pathname) && (
        <header className="flex justify-between items-center py-4 px-6 shadow-gray-500 shadow-sm ">
          <Link to="/dashboard" className="text-3xl font-bold text-orange-500">
            Betty's
          </Link>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 17a6 6 0 100-12 6 6 0 000 12zm0 0l6 6"
                />
              </svg>
            </span>
          </div>

          {/* Conditional rendering based on whether the user is logged in */}
          {username ? (
            <div className="flex justify-between items-center gap-10">
              {/* Profile section */}
              <div className="flex gap-5 place-items-center">
                <span className="text-gray-700 font-semibold">{username}</span>{" "}
                {/* Logout button */}
                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="hover:bg-red-800 duration-500 bg-red-500 px-4 py-2 active:scale-[.98] transition ease-in-out rounded-md shadow-lg shadow-black"
                  >
                    Log Out
                  </button>
                </Form>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 transition ease-in-out duration-500 px-6 py-1 rounded-lg text-white"
            >
              Login
            </Link>
          )}
        </header>
      )}
      <Outlet /> {/* Render the nested route components here */}
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
