import { Link, useLoaderData } from "react-router";
import { getVideoGames } from "~/models/product";

// Interface defining the structure of a Game object
interface Games {
  image: string;
  title: string;
  price: number;
  _id: string; // MongoDB ObjectId as a string
}

// Loader function to fetch game data and prepare it for the component
export async function loader(): Promise<Games[]> {
  const result = await getVideoGames(); // Fetch data from the database

  // Convert MongoDB ObjectId to string and ensure consistent structure
  // MongoDB ObjectIds are objects, not strings, and we need strings for React keys and routing.
  let games: Games[] = result.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return games; // Return the processed list of games
}

// Main Games component to display the list of games
export default function Games() {
  // useLoaderData() hook from react-router-dom provides access to the data loaded by the loader function.
  let videoGames = useLoaderData() as Games[]; // Get data loaded by the loader and type it

  return (
    <div>
      {/* Grid layout for responsive display of games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map over the videoGames array and render a GamesDetails component for each game */}
        {videoGames.map((videoGame) => (
          <GamesDetails key={videoGame._id} videoGame={videoGame} />
        ))}
      </div>
    </div>
  );
}

// Component to display the details of a single game
export function GamesDetails({ videoGame }: { videoGame: Games }) {
  return (
    <div className="border shadow-gray-400 rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg hover:scale-[1.02] duration-500 transition ease-in-out">
      <div className="w-full aspect-[4/3] mb-4">
        {/* Display the game's image */}
        <img
          src={videoGame.image}
          alt={videoGame.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Display the game's title */}
      <h2 className="text-center font-medium text-base sm:text-lg md:text-xl lg:text-xl mb-2">
        {videoGame.title}
      </h2>
      {/* Display the game's price */}
      <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg lg:text-md mb-4">
        Ksh {videoGame.price}
      </p>
      {/* Link to the detailed view of the game */}
      <Link
        to={`/dashboard/Games/${videoGame._id}`} // Construct the link using the game's _id
        className="flex items-center bg-gray-700 text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-md hover:bg-gray-800 duration-500 transition ease-in-out active:scale-[.98] text-sm sm:text-base lg:text-lg"
      >
        <span>View Details</span>
        <i className="fas fa-eye ml-2"></i> {/* Eye icon */}
      </Link>
    </div>
  );
}
