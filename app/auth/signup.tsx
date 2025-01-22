import { data, Form, redirect, useNavigate } from "react-router";
import { createClient } from "supabase.server";
import { commitSession, getSession, setSuccessMessage } from "session.server";
import { validateEmail, validatePassword } from "validation";
import { useState } from "react";
import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
  let { supabase, headers } = createClient(request);

  let formData = await request.formData();
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));
  let firstName = String(formData.get("firstName"));
  let lastName = String(formData.get("lastName"));

  let session = await getSession(request.headers.get("Cookie"));

  let fieldErrors: { email?: string; password?: string; general?: string } = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (!email || !password || Object.values(fieldErrors).some(Boolean)) {
    fieldErrors.general = "Please fill in all fields.";
    return data({ fieldErrors }, { status: 400 });
  }

  if (firstName && lastName) {
    let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
      },
    });

    if (signUpError) {
      fieldErrors.general = "Error creating account.";
      return data({ fieldErrors }, { status: 400 });
    }

    setSuccessMessage(session, "Account created successfully.");
    let allHeaders = {
      ...Object.fromEntries(headers.entries()),
      "Set-Cookie": await commitSession(session),
    };

    throw redirect("/dashboard", { headers: allHeaders });
  } else {
    let { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      fieldErrors.general = "Invalid email or password.";
      return data({ fieldErrors }, { status: 400 });
    }

    setSuccessMessage(session, "Signed in successfully.");
    let allHeaders = {
      ...Object.fromEntries(headers.entries()),
      "Set-Cookie": await commitSession(session),
    };

    throw redirect("/dashboard", { headers: allHeaders });
  }
}

export default function SignUp() {
  let [showPassword, setShowPassword] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Track whether it's a sign-up or login form
  const navigation = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  let handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let errors: {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    } = {};

    let form = e.target as HTMLFormElement;
    let email = form.email.value;
    let password = form.password.value;
    let firstName = form.firstName.value;
    let lastName = form.lastName.value;

    // Validate required fields
    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    setFieldErrors(errors);

    // If there are errors, prevent form submission
    if (Object.keys(errors).length > 0) return;

    // Set isSubmitting to true before submitting the form
    setIsSubmitting(true);

    try {
      // Instead of e.target.submit(), submit using fetch
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      // On successful submission, navigate to the dashboard
      navigation("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      // On submission completion (whether success or error), reset isSubmitting
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between bg-gray-100">
      <div className="relative lg:w-1/2 w-full h-96 lg:h-screen">
        <img
          src="https://i.pinimg.com/736x/ba/d0/81/bad081d9d69d5bc8b3d47c6c9960a76d.jpg"
          alt="Welcome Back"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white bg-black bg-opacity-50">
          <p className="max-w-80 text-md">
            "Betty's has completely transformed my dining experience! The
            flavors are unmatched, and the service is always top-notch. Whether
            you're craving something comforting or adventurous, Betty's has
            something for everyone. I always leave satisfied and can't wait to
            come back!"
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex justify-center items-center p-6 lg:p-12 bg-white shadow-lg h-full lg:h-screen">
        <div className="max-w-sm w-full">
          <Form
            method="post"
            onSubmit={handleSubmit}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <p className="text-gray-600">Hi, glad to have you here.</p>

            {fieldErrors.general && (
              <div className="text-red-500 text-sm mb-4">
                {fieldErrors.general}
              </div>
            )}

            {isSignUp && (
              <>
                {/* First Name Field */}
                <div className="text-left">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border bg-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {fieldErrors.firstName && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.firstName}
                    </span>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="text-left">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name:
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border bg-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {fieldErrors.lastName && (
                    <span className="text-red-500 text-sm">
                      {fieldErrors.lastName}
                    </span>
                  )}
                </div>
              </>
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
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
            </button>

            <p className="text-sm text-gray-600">
              {isSignUp ? (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-500 hover:underline"
                  >
                    Log in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Sign up
                  </button>
                </span>
              )}
            </p>
          </Form>
        </div>
      </div>
    </main>
  );
}
