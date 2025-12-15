import React, { useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

// Define the shape of the form data
// Use string for all fields, as input fields always return strings (even if empty).
interface FormData {
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// Define the shape of the expected API response data
interface RegistrationResponse {
  fristName: string;
  phoneNumber: string | null;
  message?: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    password: "",
    phoneNumber: "",
  }); // Removed 'as FormData' as initialization is consistent with interface
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    // 1. Prepare data for the API call
    // Convert empty strings to null for API payload, as required by backend
    const dataToSend = {
      fristName: formData.firstName, // Note the spelling 'fristName'
      password: formData.password,
      // FIX: Use .trim() to ensure only non-whitespace strings are sent
      email: formData.email.trim() ? formData.email.trim() : null,
      phoneNumber: formData.phoneNumber.trim()
        ? formData.phoneNumber.trim()
        : null,
    };

    // 2. Validate email/phoneNumber presence (Client-side fail-fast)
    if (!dataToSend.email && !dataToSend.phoneNumber) {
      setMessage("Email or Phone Number is required.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // 3. API Call
    try {
      // The API endpoint is /auth/registartion based on your Postman screenshot
      const response = await api.post<RegistrationResponse>(
        "/auth/registartion",
        dataToSend
      );

      setMessage(
        response.data.message ||
          "Registration Successful! Check Your Email/Phone for verification."
      );
      setIsError(false);

      // Clear form after successful submission
      setFormData({
        firstName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });

      if (response?.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Registration Error:", error);

      // Extract error message from the response object
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred during registration.";

      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div className="max-w-md mx-auto  my-12 p-6 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your first name"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (Optional):
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email} // Removed || "" as email is guaranteed to be a string
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="email@example.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number (Optional):
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber} // Removed || "" as phoneNumber is guaranteed to be a string
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 01XXXXXXXXX"
            />
          </div>

          {/* Submission Message */}
          {message && (
            <p
              className={`text-sm font-semibold p-2 rounded-md ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          You must provide either an{" "}
          <span className="font-semibold text-gray-700">Email</span> or a{" "}
          <span className="font-semibold text-gray-700">Phone Number</span> to
          register.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
