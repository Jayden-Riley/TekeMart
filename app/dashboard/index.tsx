import { Link } from "react-router";

interface CategoriesProps {
  image: string;
  title: string;
}
export default function DashboardIndex() {
  return (
    <main>
      <section className="p-4  mx-auto flex gap-5 ">
        <div className="w-full h-64 mx-auto bg-[url('https://i.pinimg.com/736x/62/17/6d/62176d1092cf5899e1007dcb3ad96a20.jpg')] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black bg-opacity-5 p-6 h-64">
            <div className="max-w-52">
              <h1 className="text-4xl font-bold text-gray-400 mb-3">
                BIG SALE!
              </h1>
              <p className="text-gray-200 text-sm mb-12 ">
                Wireless HeaPhones With Noise Cancellation
              </p>
              <Link
                to="/phones"
                className="bg-orange-500 hover:bg-orange-700 active:scale-95 py-3 px-8 rounded-xl shadow-lg shadow-black text-white"
              >
                HeadPhones
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-md mx-auto bg-gradient-to-r from-[#e5c6ab] to-[#d8e9fd]  rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Get Up to <span className="text-orange-500">20%</span> off on
                HeadPhones
              </h2>
            </div>
          </div>
          <div>
            <div className="bg-[url('https://i.pinimg.com/736x/37/35/45/373545a4d42e18a60c1cd33c362ed9a6.jpg')] bg-cover bg-top bg-no-repeat rounded-lg shadow-lg overflow-hidden mt-3 h-28 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white mb-0  bg-opacity-60 px-4 py-2 rounded-lg shadow-md">
                Samsung 24 Ultra
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-semibold mx-5">Explore Now</h2>
        <div className="flex gap-4 my-5 mx-5">
          <Categories
            image="https://i.pinimg.com/736x/d5/2b/f5/d52bf56f0ee05f2827602b530bfa2700.jpg"
            title="Game Controllers"
          />
          <Categories
            image="https://i.pinimg.com/736x/28/a6/6a/28a66a2fae8ac1ebdcc085efb848d11d.jpg"
            title="Laptops"
          />
          <Categories
            image="https://i.pinimg.com/736x/d2/22/9a/d2229ac2482423a06322296f6a4897e4.jpg"
            title="Smart TVs"
          />
          <Categories
            image="https://i.pinimg.com/736x/62/1a/2a/621a2a4df4bc79a6823f08ab61397cbf.jpg"
            title="Furniture"
          />
        </div>
      </section>
    </main>
  );
}
const Categories = ({ image, title }: CategoriesProps) => (
  <div className="relative w-full h-64 hover:scale-[.98] duration-300 transition ease-in-out">
    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
    <img src={image} className="w-full h-full object-cover rounded-md" />
    <h3 className="absolute bottom-20 left-10 font-semibold text-xl text-gray-200 px-4 py-2 rounded-md">
      {title}
    </h3>
  </div>
);
