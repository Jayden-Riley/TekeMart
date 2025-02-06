import { Link, useLoaderData } from "react-router";
import { getComputers } from "~/models/product";

// Interface defining the structure of a Computer object
interface Computers {
  image: string;
  title: string;
  price: number;
  _id: string; // MongoDB ObjectId as a string
}

// Loader function to fetch computer data and prepare it for the component
export async function loader(): Promise<Computers[]> {
  const result = await getComputers(); // Fetch data from the database

  // Convert MongoDB ObjectId to string and ensure consistent structure
  // This is important because MongoDB ObjectIds are objects, not strings, and
  // we want to work with strings consistently in our React components.
  let computers: Computers[] = result.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return computers; // Return the processed list of computers
}

// Main Computers component to display the list of computers
export default function Computers() {
  // useLoaderData() is a hook provided by react-router-dom that gives access
  // to the data loaded by the loader function associated with this route.
  let computers = useLoaderData() as Computers[]; // Get data loaded by the loader and type it

  return (
    <div>
      {/* Grid layout to display the computers responsively */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the computers array and render a ComputerDetails component for each computer */}
        {computers.map((computer) => (
          <ComputerDetails key={computer._id} computer={computer} />
        ))}
      </div>
    </div>
  );
}

// Component to display the details of a single computer
export function ComputerDetails({ computer }: { computer: Computers }) {
  return (
    <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-[1.02] duration-500 transition ease-in-out">
      <div className="w-full aspect-[4/3] mb-4">
        {/* Display the computer image */}
        <img
          src={computer.image}
          alt={computer.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Display the computer title */}
      <h2 className="text-center font-medium text-base sm:text-lg md:text-xl lg:text-xl mb-2">
        {computer.title}
      </h2>
      {/* Display the computer price */}
      <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-md mb-4">
        Ksh {computer.price}
      </p>
      {/* Link to the detailed view of the computer */}
      <Link
        to={`/dashboard/Computers/${computer._id}`} // Construct the link using the computer's _id
        className="flex items-center bg-gray-700 text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-md hover:bg-gray-800 duration-500 transition ease-in-out active:scale-[.98] text-sm sm:text-base lg:text-lg"
      >
        <span>View Details</span>
        <i className="fas fa-eye ml-2"></i> {/* Eye icon */}
      </Link>
    </div>
  );
}
