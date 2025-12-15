import React, { useState } from "react";
import { api } from "../lib/axios"; // Assuming your axios setup is in '../lib/axios'
import { useNavigate } from "react-router-dom";

// Define the shape of the form data
interface FormData {
  contact: string; // Used for either email or phoneNumber input
  password: string;
}

// Define the structure of the successful API response data
interface LoginSuccessResponse {
  accessToken: string;
  username: string;
  email: string | null;
}

// Define the structure of the Unverified Account API response data
interface UnverifiedResponse {
  verified: false;
  verificationMethod: "email" | "phoneNumber";
  message: string;
  maskedContact: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    contact: "",
    password: "",
  });
const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper function to determine if the contact input is an email
  const isEmail = (contact: string): boolean => {
    // Simple regex check for email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  };

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

    const contactValue = formData.contact.trim();

    // 1. Prepare data for the API call based on input type
    let dataToSend: { email?: string; phoneNumber?: string; password: string };

    if (isEmail(contactValue)) {
      dataToSend = { email: contactValue, password: formData.password };
    } else {
      // Assuming anything not recognized as email is treated as phone number
      dataToSend = { phoneNumber: contactValue, password: formData.password };
    }

    // Client-side basic validation
    if (!contactValue || !formData.password) {
      setMessage("Contact (Email/Phone) and Password are required.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // 2. API Call
    try {
      const response = await api.post("/auth/login", dataToSend);
      const responseData = response.data.data;

      if (response.status === 200) {
        if (responseData.accessToken) {
          localStorage.setItem("accessToken", responseData.accessToken);
          setMessage(
            `Welcome back, ${responseData.username}! Login successful.`
          );
          setIsError(false);
         navigate("/");
        } else if (responseData.verified === false) {
          // --- 🟡 Handle Unverified Account (OTP Sent) ---
          const unverifiedData = responseData as UnverifiedResponse;
          setMessage(
            `Account not verified. Verification code sent to ${unverifiedData.maskedContact}. Please check your ${unverifiedData.verificationMethod}.`
          );
          setIsError(false);
          // Optional: Show a new OTP input form here.
        } else {
          throw new Error("Invalid response structure from server.");
        }
      }
    } catch (error: any) {
      console.error("Login Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred during login or communication.";

      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full justify-center items-center flex ">
      <div className="max-w-md mx-auto my-12 p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Sign In to Clicon
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Input (Email or Phone Number) */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email or Phone Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="email@example.com or 01XXXXXXXXX"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="••••••••"
            />
          </div>

          {/* Submission Message */}
          {message && (
            <p
              className={`text-sm font-semibold p-3 rounded-lg ${
                isError
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-lg font-medium text-white transition duration-150 ease-in-out ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            }`}
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
