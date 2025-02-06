import { Link } from "react-router";

// Interface defining the props for the Categories component
interface CategoriesProps {
  image: string;
  title: string;
  link: string;
}

// Main dashboard index page component
export default function DashboardIndex() {
  return (
    <main className="p-4">
      {/* Hero Section - Large banner image and promotional text */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-2/3 h-64 mx-auto bg-[url('https://i.pinimg.com/736x/62/17/6d/62176d1092cf5899e1007dcb3ad96a20.jpg')] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black bg-opacity-50 p-6 h-full flex flex-col justify-center">
            <div className="max-w-52">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-400 mb-3">
                BIG SALE!
              </h1>
              <p className="text-gray-200 text-sm md:text-base mb-6 md:mb-12">
                Wireless Headphones With Noise Cancellation
              </p>
              <Link
                to="/dashboard/electronics" // Link to the electronics category page
                className="bg-orange-500 hover:bg-orange-700 active:scale-95 py-2 px-6 md:py-3 md:px-8 rounded-xl shadow-lg text-white"
              >
                HeadPhones
              </Link>
            </div>
          </div>
        </div>

        {/* Smaller promotional boxes */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <div className="max-w-md mx-auto bg-gradient-to-r from-[#e5c6ab] to-[#d8e9fd] rounded-lg shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Get Up to <span className="text-orange-500">20%</span> off on
              HeadPhones
            </h2>
          </div>
          <div className="bg-[url('https://i.pinimg.com/736x/37/35/45/373545a4d42e18a60c1cd33c362ed9a6.jpg')] bg-cover bg-top bg-no-repeat rounded-lg shadow-lg overflow-hidden h-24 md:h-28 flex items-center justify-center">
            <h2 className="text-lg md:text-2xl font-bold text-white bg-opacity-60 px-4 py-2 rounded-lg shadow-md">
              Samsung 24 Ultra
            </h2>
          </div>
        </div>
      </section>

      {/* Categories Section - Displays clickable category cards */}
      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl font-semibold mx-5">Explore Now</h2>
        <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 mx-5">
          {/* Categories components rendered with their respective data */}
          <Categories
            image="https://i.pinimg.com/736x/d5/2b/f5/d52bf56f0ee05f2827602b530bfa2700.jpg"
            title="Game Controllers"
            link="/dashboard/electronics"
          />
          <Categories
            image="https://i.pinimg.com/736x/93/69/e1/9369e100b7d144ffd29c511afc48d843.jpg"
            title="Pet Shampoos"
            link="/dashboard/petSupplies"
          />
          <Categories
            image="https://i.pinimg.com/736x/5f/8f/2f/5f8f2fd0c354d6494a4670f53ba84f36.jpg"
            title="Laptops"
            link="/dashboard/computers"
          />
          <Categories
            image="https://i.pinimg.com/736x/27/be/0b/27be0bd8fd0b9267313a599374407dfa.jpg"
            title="Toys"
            link="/dashboard/toys"
          />
        </div>
      </section>
    </main>
  );
}

// Categories component - Reusable component for displaying a category card
const Categories = ({ image, title, link }: CategoriesProps) => (
  <Link
    to={link} // Link to the specified category page
    className="relative w-full h-64 hover:scale-[.98] duration-300 transition ease-in-out"
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>{" "}
    {/* Overlay for image */}
    <img
      src={image}
      className="w-full h-full object-cover rounded-md"
      alt={title} // Alt text for accessibility
    />
    <h3 className="absolute bottom-20 left-10 font-semibold text-xl text-gray-200 px-4 py-2 rounded-md">
      {title}
    </h3>
  </Link>
);
