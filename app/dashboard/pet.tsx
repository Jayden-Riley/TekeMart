import { Link, useLoaderData } from "react-router";
import { getPetSupplies } from "~/models/product";

// Interface defining the structure of a PetSupplies object
interface Pets {
  image: string;
  title: string;
  price: number;
  _id: string; // MongoDB ObjectId as a string
}

// Loader function to fetch pet supplies data and prepare it for the component
export async function loader(): Promise<Pets[]> {
  const result = await getPetSupplies(); // Fetch data from the database

  // Convert MongoDB ObjectId to string and ensure consistent structure
  // MongoDB ObjectIds are objects, not strings, and we need strings for React keys and routing.
  let petSupplies: Pets[] = result.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return petSupplies; // Return the processed list of pet supplies
}

// Main PetSupplies component to display the list
export default function PetSupplies() {
  // useLoaderData() hook from react-router-dom provides access to the data loaded by the loader function.
  let petSupplies = useLoaderData() as Pets[]; // Get data loaded by the loader and type it

  return (
    <div>
      {/* Grid layout for responsive display of pet supplies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the petSupplies array and render a PetSuppliesDetails component for each item */}
        {petSupplies.map((supply) => (
          <PetSuppliesDetails key={supply._id} supply={supply} /> // Use PetSuppliesDetails component
        ))}
      </div>
    </div>
  );
}

// Component to display the details of a single pet supply item
export function PetSuppliesDetails({ supply }: { supply: Pets }) {
  // Renamed component for clarity
  return (
    <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-[1.02] duration-500 transition ease-in-out">
      <div className="w-full aspect-[4/3] mb-4">
        {/* Display the pet supply's image */}
        <img
          src={supply.image}
          alt={supply.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Display the pet supply's title */}
      <h2 className="text-center font-medium text-base sm:text-lg md:text-xl lg:text-xl mb-2">
        {supply.title}
      </h2>
      {/* Display the pet supply's price */}
      <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-md mb-4">
        Ksh {supply.price}
      </p>
      {/* Link to the detailed view of the pet supply item */}
      <Link
        to={`/dashboard/PetSupplies/${supply._id}`} // Construct the link using the supply's _id
        className="flex items-center bg-gray-700 text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-md hover:bg-gray-800 duration-500 transition ease-in-out active:scale-[.98] text-sm sm:text-base lg:text-lg"
      >
        <span>View Details</span>
        <i className="fas fa-eye ml-2"></i> {/* Eye icon */}
      </Link>
    </div>
  );
}
