import React, { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';


function SignUp() {
const { flash } = usePage().props;

 useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
}, [flash]);

  const [showPassword, isShowPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    post('/register');
    }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <Toaster position="top-center" reverseOrder={false} />
        {/* Heading */}
        <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h4>
        <p className="text-center text-gray-600 mb-4">
          Create an account to get started
        </p>

  
        {/* Form */}
        <form  onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-4">
            {/* First Name Input */}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={data.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full px-3 py-2 border ${
                   errors.firstname ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 ${
                   errors.firstname
                    ? "focus:ring-red-400"
                    : "focus:ring-purple-400"
                } text-sm transition-colors`}
              />
              { errors.firstname && (
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
                    { errors.firstname}
                  </span>
                </div>
              )}
            </div>
            {/* Last Name Input */}
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={data.lastname}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full px-3 py-2 border ${
                   errors.lastname ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 ${
                   errors.lastname
                    ? "focus:ring-red-400"
                    : "focus:ring-purple-400"
                } text-sm transition-colors`}
              />
              { errors.lastname && (
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
                    { errors.lastname}
                  </span>
                </div>
              )}
            </div>
          </div>
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
              id="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border ${
                 errors.email ? "border-red-400" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                 errors.email
                  ? "focus:ring-red-400"
                  : "focus:ring-purple-400"
              } text-sm transition-colors`}
            />
            { errors.email && (
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
                <span className="text-xs font-medium">{ errors.email}</span>
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
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border ${
                   errors.password ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 ${
                   errors.password
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
            { errors.password && (
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
                  { errors.password}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
          >
             {processing ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link 
        href="/login"
        className="text-sm text-purple-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
