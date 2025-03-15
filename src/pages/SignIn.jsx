import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";

function SignIn() {
  const SignInToast = () =>
    toast.success("🎉 Welcome back! You're successfully signed in.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  const [showPassword, isShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const To = useNavigate();

  function validateForm() {
    let isValid = true;
    const newError = { emailError: "", passwordError: "" };

    if (!formData.email) {
      newError.emailError = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newError.emailError = "Please enter a valid email address";
        isValid = false;
      }
    }
    if (!formData.password) {
      newError.passwordError = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newError.passwordError = "Password must be at least 6 characters long";
      isValid = false;
    }

    setError(newError);
    return isValid;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      SignInToast();
      setTimeout(() => {
        To("/home");
      }, 2500);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Heading */}
        <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h4>
        <p className="text-center text-gray-600 mb-4">
          Enter your credentials to access your account
        </p>

        {/* Demo Credentials */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> Firstname.lastname@domain.com
          </p>
          <p className="text-sm text-gray-700">
            <strong>Password:</strong> Firsname@123456
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={formData.email}
              id="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border ${
                error.emailError ? "border-red-400" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                error.emailError
                  ? "focus:ring-red-400"
                  : "focus:ring-purple-400"
              } text-sm transition-colors`}
            />
            {error.emailError && (
              <div className="mt-1.5 flex items-center gap-1.5 text-red-600">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-medium">{error.emailError}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                id="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border ${
                  error.passwordError ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 ${
                  error.passwordError
                    ? "focus:ring-red-400"
                    : "focus:ring-purple-400"
                } text-sm transition-colors`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => {
                  isShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <LuEye className="w-5 h-5" />
                ) : (
                  <LuEyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>
            {error.passwordError && (
              <div className="mt-1.5 flex items-center gap-1.5 text-red-600">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-medium">
                  {error.passwordError}
                </span>
              </div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/sign-up"
            className="text-sm text-purple-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
