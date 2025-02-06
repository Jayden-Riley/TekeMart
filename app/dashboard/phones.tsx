import { useLoaderData, Link } from "react-router";
import { getPhones } from "~/models/product";

// Interface defining the structure of a Phone object
interface Phone {
  image: string;
  title: string;
  price: number;
  _id: string; // MongoDB ObjectId as a string
}

// Loader function to fetch and process phone data from the database
export async function loader(): Promise<Phone[]> {
  const result = await getPhones(); // Fetch phone data

  // Convert MongoDB ObjectIds to strings for use in React components
  const phones: Phone[] = result.map((product: any) => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to string
  }));

  return phones; // Return the processed phone data
}

// Main Phones component to display the list of phones
export default function Phones() {
  const phones = useLoaderData() as Phone[]; // Access data loaded by the loader

  return (
    <div>
      {/* Grid layout for responsive display of phone cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the phones array and render a PhoneDetails component for each phone */}
        {phones.map((phone) => (
          <PhoneDetails key={phone._id} phone={phone} /> // Key prop is essential for React's rendering efficiency
        ))}
      </div>
    </div>
  );
}

// Component to display the details of a single phone, including a "View Details" link
export function PhoneDetails({ phone }: { phone: Phone }) {
  return (
    <div className="grid gap-4 p-4">
      {" "}
      {/* Added grid for better spacing */}
      {/* Phone Card Component */}
      <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-[1.02] duration-500 transition ease-in-out">
        <div className="w-full aspect-[4/3] mb-4">
          <img
            src={phone.image}
            alt={phone.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h2 className="text-center font-medium text-base sm:text-lg md:text-xl lg:text-xl mb-2">
          {phone.title}
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-md mb-4">
          Ksh {phone.price}
        </p>
        {/* Link to the individual phone details page */}
        <Link
          to={`/dashboard/phones/${phone._id}`} // Construct the link using the phone's _id
          className="flex items-center bg-gray-700 text-white sm:py-3 sm:px-6 rounded-md hover:bg-gray-800 duration-500 transition ease-in-out active:scale-[.98] text-sm sm:text-base lg:text-lg"
        >
          <span>View Details</span>
          <i className="fas fa-eye ml-2"></i> {/* Eye icon */}
        </Link>
      </div>
    </div>
  );
}
