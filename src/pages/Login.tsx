import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const { googleSignin, signin } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleGoogleSignIn = () => {
    googleSignin();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      signin({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
      <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg hover:shadow-md transition-all duration-200"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google Icon"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <form
          className="flex flex-col gap-4 text-start py-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="py-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
