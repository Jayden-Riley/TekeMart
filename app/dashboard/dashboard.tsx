import { NavLink, Outlet, useLocation } from "react-router"; // useLocation to determine the active route
import type { Route } from "./+types/dashboard";
import { requireUser } from "supabase.server";

// Loader function to ensure the user is authenticated
export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request); // Ensures that the user is authenticated before accessing the dashboard
  return null; // Returning null as the loader does not need to return any specific data
}

export function Dashboard() {
  // List of links for the dashboard categories
  let dashboardLinks = [
    { path: "/dashboard/phones", text: "Phones" },
    { path: "/dashboard/computers", text: "Computers" },
    { path: "/dashboard/clothing", text: "Clothing" },
    { path: "/dashboard/toys", text: "Toys" },
    { path: "/dashboard/videoGames", text: "Video Games" },
    { path: "/dashboard/jewelry", text: "Jewelry" },
    { path: "/dashboard/petSupplies", text: "Pet Supplies" },
  ];

  return (
    <main className="flex">
      <h1 className="font-bold">Categories</h1>

      {/* Side navigation bar */}
      <nav className="w-96 bg-zinc-600 min-h-screen">
        <ul>
          {/* Loop through dashboardLinks array to generate the navigation items */}
          {dashboardLinks.map((item) => (
            <li className="p-2" key={crypto.randomUUID()}>
              <NavLink
                to={item.path} // The path of the link
                className="bg-[#353b45] w-full p-3 rounded-md flex gap-2 items-centre active:scale[0.98] hover:bg-[#2f343d] transition ease-in-out duration-500"
              >
                <div className="hover:text-pink-700 flex gap-4 transition ease-in-out duration-500">
                  {item.text} {/* Display the text of the link */}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content area */}
      <div className="border-4 border-green-600 w-full">
        {/* If you are using nested routes, the Outlet component will render them */}
        <Outlet />
      </div>
    </main>
  );
}
