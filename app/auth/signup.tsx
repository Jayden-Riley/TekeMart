import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  // State to manage form inputs
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ general?: string }>({});

  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setIsSubmitting(true);

    // Basic validation to ensure all fields are filled
    if (!email || !password || !firstName || !lastName) {
      setFieldErrors({ general: "All fields are required" });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call later)
    setTimeout(() => {
      console.log("User registered:", { email, password, firstName, lastName });

      // Redirect to the dashboard after successful signup
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between bg-gray-100">
      {/* Left Section - Image with Quote */}
      <div className="relative lg:w-1/2 w-full h-96 lg:h-screen">
        <img
          src="https://i.pinimg.com/736x/ba/d0/81/bad081d9d69d5bc8b3d47c6c9960a76d.jpg"
          alt="Welcome Back"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white bg-black bg-opacity-50 px-4">
          <p className="max-w-80 text-md text-center">
            "TekeMall has completely transformed my dining experience! The
            flavors are unmatched, and the service is always top-notch."
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="lg:w-1/2 w-full flex justify-center items-center p-6 lg:p-12 bg-white shadow-lg h-full lg:h-screen">
        <div className="max-w-sm w-full">
          <form onSubmit={handleSubmit} className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
            <p className="text-gray-600">Hi, glad to have you here.</p>

            {/* Display error messages if any */}
            {fieldErrors.general && (
              <p className="text-red-500 text-sm">{fieldErrors.general}</p>
            )}

            {/* First Name Input */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Last Name Input */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email Input */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {/* Toggle Password Visibility Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Redirect to Login Page */}
          <Link
            to="/login"
            className="mt-4 text-gray-400 inline-block hover:underline"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </main>
  );
}
