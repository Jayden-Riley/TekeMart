import { useLoaderData, Link } from "react-router-dom";
import { getToys } from "~/models/product";

// Interface defining the structure of a Toy object
interface Toys {
  image: string;
  title: string;
  price: number;
  _id: string; // MongoDB ObjectId as a string
}

// Loader function to fetch and process toy data from the database
export async function loader(): Promise<Toys[]> {
  const result = await getToys(); // Fetch toy data

  // Convert MongoDB ObjectIds to strings for use in React components
  const toys: Toys[] = result.map((product: any) => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to string
  }));

  return toys; // Return the processed toy data
}

// Main Toys component to display the list of toys
export default function Toys() {
  const toys = useLoaderData() as Toys[]; // Access data loaded by the loader

  return (
    <div className="container mx-auto p-4">
      {" "}
      {/* Added container for centering */}
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the toys array and render a ToysDetails component for each toy */}
        {toys.map((toy) => (
          <ToysDetails key={toy._id} toy={toy} /> // Key prop is essential for React's rendering efficiency
        ))}
      </div>
    </div>
  );
}

// Component to display the details of a single toy, including a "View Details" link
export function ToysDetails({ toy }: { toy: Toys }) {
  return (
    <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-[1.02] duration-500 transition ease-in-out">
      <div className="w-full aspect-[4/3] mb-4">
        <img
          src={toy.image}
          alt={toy.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h2 className="text-center font-medium text-base sm:text-lg md:text-xl lg:text-xl mb-2">
        {toy.title}
      </h2>
      <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-md mb-4">
        Ksh {toy.price}
      </p>
      {/* Link to the individual toy details page */}
      <Link
        to={`/dashboard/Toys/${toy._id}`} // Construct the link using the toy's _id
        className="flex items-center bg-gray-700 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:bg-gray-800 duration-500 transition ease-in-out active:scale-[.98] text-sm sm:text-base lg:text-lg"
      >
        <span>View Details</span>
        <i className="fas fa-eye ml-2"></i> {/* Eye icon */}
      </Link>
    </div>
  );
}
