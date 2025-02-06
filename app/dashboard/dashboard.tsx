import {
  ShoppingBasket,
  Gamepad2,
  Smartphone,
  PawPrint,
  ToyBrick,
  UserCircle,
  Menu,
  X,
  Laptop,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

// Dashboard component - Main layout for the dashboard
export default function Dashboard() {
  // State to manage sidebar visibility (for smaller screens)
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    console.log("Toggling sidebar, current state:", isOpen); // Debugging line (can be removed in production)
    setIsOpen(!isOpen);
  };

  // Array of dashboard links with their paths, text, and icons
  const dashboardLinks = [
    { path: "/dashboard/phones", text: "Phones", icon: <Smartphone /> },
    { path: "/dashboard/computers", text: "Computer", icon: <Laptop /> },
    {
      path: "/dashboard/electronics",
      text: "Electronics",
      icon: <ShoppingBasket />,
    },
    { path: "/dashboard/games", text: "Games", icon: <Gamepad2 /> },
    {
      path: "/dashboard/petSupplies",
      text: "Pet Supplies",
      icon: <PawPrint />,
    },
    { path: "/dashboard/toys", text: "Toys", icon: <ToyBrick /> },
    { path: "/dashboard/profile", text: "Profile", icon: <UserCircle /> }, // Corrected path to /dashboard/profile
  ];

  return (
    <main className="flex min-h-screen relative">
      {/* Toggle Button - Visible only on smaller screens (mobile menu) */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white hidden rounded-md lg:hidden border-2 border-green-700" // Added lg:hidden to hide on larger screens
        onClick={toggleSidebar}
      >
        {/* Conditionally render Menu or X icon based on sidebar state */}
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`fixed top-0 left-0 w-64 h-full p-5 transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
       lg:translate-x-0 lg:relative lg:block`} // Always visible on large screens
      >
        <h2 className="text-lg font-bold mb-6 text-center">Dashboard</h2>
        <ul>
          {/* Map through dashboardLinks array to create navigation links */}
          {dashboardLinks.map((item) => (
            <li key={item.path} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 text-black py-3 rounded-md transition-colors duration-300 ${
                    isActive ? "bg-pink-700 " : "hover:bg-blue-100" // Active link styling
                  }`
                }
              >
                {item.icon} {/* Render the icon */}
                <span>{item.text}</span> {/* Render the link text */}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-2 ">
        {" "}
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </main>
  );
}
