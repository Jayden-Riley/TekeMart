import { data, Form, Link, redirect, useNavigation } from "react-router"; // Corrected to react-router-dom
import { createClient } from "supabase.server";
import { useEffect, useState } from "react";
import { commitSession, getSession, setSuccessMessage } from "session.server";
import { validateEmail, validatePassword } from "validation";
import type { Route } from "./+types/login";

// This function handles the form submission logic
export async function action({ request }: Route.ActionArgs) {
  let { supabase, headers } = createClient(request);

  let formData = await request.formData();
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));

  let session = await getSession(request.headers.get("Cookie"));

  // Initialize fieldErrors object with optional general error field
  let fieldErrors: { email?: string; password?: string; general?: string } = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  // Check if email or password validation failed
  if (!email || !password || Object.values(fieldErrors).some(Boolean)) {
    fieldErrors.general = "Please fill in all fields.";
    return data({ fieldErrors }, { status: 400 });
  }

  // If credentials are correct, proceed with Supabase authentication
  let { data: userData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Handle errors from Supabase (such as wrong credentials)
    fieldErrors.general = "Invalid email or password.";
    return data({ fieldErrors }, { status: 400 });
  }

  console.log({ userData });

  let userEmail = userData.user?.email;

  if (userEmail) {
    setSuccessMessage(session, "logged in successfully");
  }

  let allHeaders = {
    ...Object.fromEntries(headers.entries()),
    "Set-Cookie": await commitSession(session),
  };

  // Redirect to dashboard instead of non-existent customer-page
  throw redirect("/dashboard", {
    headers: allHeaders,
  });
}

export default function Login() {
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Local state for submitting

  const navigation = useNavigation();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  let handleSubmit = (e: any) => {
    e.preventDefault();

    let errors: { email?: string; password?: string } = {};

    let email = e.target.email.value;
    let password = e.target.password.value;

    // Validate only if the email or password is empty when submitting
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    setFieldErrors(errors);

    // If there are errors, prevent form submission
    if (Object.keys(errors).length > 0) return;

    // Set isSubmitting to true before submitting the form
    setIsSubmitting(true);

    // Submit the form if there are no errors
    e.target.submit();
  };

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between bg-gray-100">
      {/* Left Section */}
      <div className="relative lg:w-1/2 w-full h-96 lg:h-screen">
        <img
          src="https://i.pinimg.com/736x/ba/d0/81/bad081d9d69d5bc8b3d47c6c9960a76d.jpg"
          alt="Welcome Back"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-50">
          Welcome Back!
        </h1>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-6 lg:p-12 bg-white shadow-lg h-full lg:h-screen">
        <div className="max-w-sm w-full">
          <Form
            method="post"
            onSubmit={handleSubmit}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
            <p className="text-gray-600">
              Welcome back! Please log in to your account.
            </p>

            {/* General Error Message */}
            {fieldErrors.general && (
              <div className="text-red-500 text-sm mb-4">
                {fieldErrors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full px-4 py-2 border ${
                  fieldErrors.email
                    ? "border-red-500"
                    : "bg-gray-500 border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                aria-invalid={fieldErrors.email ? "true" : "false"}
              />
              {fieldErrors.email && (
                <span className="text-red-500 text-sm">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 w-full px-4 py-2 ${
                    fieldErrors.password
                      ? "border-red-500"
                      : "bg-gray-500 border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  aria-invalid={fieldErrors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {fieldErrors.password && (
                <span className="text-red-500 text-sm">
                  {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition ease-in-out duration-300 text-white font-semibold py-2 px-4 rounded-md w-full active:scale-[.98]"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </Form>
          <Link
            to="/signup"
            className="mt-4 text-gray-400 inline-block hover:underline"
          >
            Don't have an Account? Sign up here
          </Link>
        </div>
      </div>
    </main>
  );
}
