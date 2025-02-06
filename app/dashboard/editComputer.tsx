// import {
//   Form,
//   redirect,
//   useLoaderData,
//   useActionData,
//   useNavigate,
//   useNavigation,
// } from "react-router-dom"; // Corrected import from 'react-router' to 'react-router-dom'
// import { commitSession, getSession, setSuccessMessage } from "session.server";
// import {
//   deleteComputer,
//   getComputerById,
//   updateComputer,
// } from "~/models/product";
// import { ObjectId } from "mongodb";

// interface Computers {
//   description: string;
//   image: string;
//   title: string;
//   price: number;
//   _id: ObjectId;
// }

// export async function action({ params, request }: Route["ActionArgs"]) {
//   let id = params.id;
//   if (!id) return new Response("Product ID is required", { status: 400 });

//   try {
//     let body = await request.formData();
//     let title = body.get("name") as string;
//     let description = body.get("description") as string;
//     let price = Number(body.get("price"));
//     let quantity = Number(body.get("quantity"));
//     let image = body.get("image") as string;
//     let intent = body.get("intent");

//     if (!title || !description || isNaN(price) || price < 0 || quantity < 0) {
//       return {
//         message: "Please provide valid input values for all fields 😡. ",
//       };
//     }

//     let session = await getSession(request.headers.get("Cookie"));
//     if (!session) return new Response("Unauthorized", { status: 401 });

//     let product = await getComputerById(id);
//     if (!product) return new Response("Product not found", { status: 404 });

//     switch (intent) {
//       case "save": {
//         let result = await updateComputer(id, {
//           _id: product._id,
//           title,
//           price,
//           image,
//         });
//         setSuccessMessage(session, "Product updated successfully 👍");
//         break;
//       }
//       case "delete": {
//         let deletedProduct = await deleteComputer(id);
//         if (!deletedProduct) {
//           return { message: "An error occurred while deleting the product" };
//         }
//         setSuccessMessage(session, "Product deleted successfully 👍");
//         break;
//       }
//     }

//     return redirect("/dashboard/products", {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return {
//       message:
//         "An error occurred while saving changes. Please try again later.",
//     };
//   }
// }

// export async function loader({ params }: Route["LoaderArgs"]) {
//   let id = params.id as string;
//   let product = await getComputerById(id);
//   if (!product) throw new Response("Product not found :(", { status: 404 });
//   return product;
// }

// // Product Edit Component
// export default function ProductEdit() {
//   let product = useLoaderData() as {
//     image: string;
//     title: string;
//     description: string;
//     price: number;
//     quantity: number;
//   }; // Retrieving the product data from the loader

//   let errors = useActionData(); // Retrieving any errors from the action function
//   let navigation = useNavigation(); // Using the navigation hook to track the form submission state
//   let isSubmitting = navigation.state === "submitting"; // Checking if the form is currently being submitted
//   let navigate = useNavigate(); // Hook for programmatically navigating between pages

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Title of the Edit Product page */}
//       <h1 className="text-2xl font-bold text-red-500 mb-6 text-center">
//         Edit Product
//       </h1>

//       {/* Displaying error message if any */}
//       {errors?.message && (
//         <div className="text-red-600 bg-red-100 p-4 rounded-md mb-4">
//           {errors.message}
//         </div>
//       )}

//       {/* Form for editing product */}
//       <Form method="post" className="space-y-4">
//         {/* Product name input */}
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Product Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             defaultValue={product?.title || ""}
//             className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* Image URL input */}
//         <div>
//           <label
//             htmlFor="image"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Image URL
//           </label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             defaultValue={product?.image || ""}
//             className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* Product description input */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             rows={3}
//             defaultValue={product?.description || ""}
//             className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           ></textarea>
//         </div>

//         {/* Price input */}
//         <div>
//           <label
//             htmlFor="price"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Price (Ksh)
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             min="0"
//             defaultValue={product?.price || ""}
//             className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* Quantity input */}
//         <div>
//           <label
//             htmlFor="quantity"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Quantity
//           </label>
//           <input
//             type="text"
//             id="quantity"
//             name="quantity"
//             min="0"
//             defaultValue={product?.quantity || ""}
//             className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* Action buttons (Save, Cancel, Delete) */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             name="intent"
//             value="save"
//             disabled={isSubmitting}
//             className={`w-full py-2 px-4 text-white rounded-md ${
//               isSubmitting ? "bg-gray-400" : "hover:bg-green-700 bg-green-500"
//             } transition ease-in-out duration-500 active:scale-[.98]`}
//           >
//             {isSubmitting && navigation.formData?.get("intent") === "save"
//               ? "Saving..."
//               : "Save Changes"}
//           </button>

//           {/* Cancel button */}
//           <button
//             type="button"
//             onClick={() => navigate(-1)} // Navigates to the previous page
//             className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition ease-in-out duration-500 active:scale-[.98]"
//           >
//             Cancel
//           </button>

//           {/* Delete button */}
//           <button
//             name="intent"
//             value="delete"
//             className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md transition ease-in-out duration-500 active:scale-[.98]"
//           >
//             {isSubmitting && navigation.formData?.get("intent") === "delete"
//               ? "deleting..."
//               : "delete"}
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }
