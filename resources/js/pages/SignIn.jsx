import React, { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link , router, useForm, usePage} from "@inertiajs/react";
import { Flip, ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';


function SignIn() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
}, [flash]);

  const [showPassword, isShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    post("/login");
}

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Heading */}
        <Toaster position="top-center" reverseOrder={false} />
        <h4 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h4>
        <p className="text-center text-gray-600 mb-4">
          Enter your credentials to access your account
        </p>

        {/* Demo Credentials */}
      

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
              value={data.email}
              id="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 ${
                errors.email
                  ? "focus:ring-red-400"
                  : "focus:ring-purple-400"
              } text-sm transition-colors`}
            />
            {errors.email && (
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
                <span className="text-xs font-medium">{errors.email}</span>
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
                value={data.password}
                id="password"
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
            {errors.password && (
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
                  {errors.password}
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
            disabled={processing}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
          >
              {processing ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
           href='/signup'
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
