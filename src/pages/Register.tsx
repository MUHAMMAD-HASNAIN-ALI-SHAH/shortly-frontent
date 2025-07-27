import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";

const Register = () => {
  const { googleSignin, register, authLoader, verifyCode } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const [verificationPage, setVerificationPage] = useState(false);

  const handleGoogleSignIn = () => {
    googleSignin();
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register(formData).then((status) => {
      if (status === 1) {
        setVerificationPage(true);
      }
    });
  };

  const navigate = useNavigate();

  const handleCodeSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (code) {
      verifyCode({ code, email: formData.email }).then((status) => {
        if (status === 1) {
          setVerificationPage(false);
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
      {verificationPage ? (
        <div className="bg-white rounded-md shadow-xl px-8 py-4 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Enter Verification Code
          </h2>
          <p className="text-gray-500 mb-6">
            Please enter the verification code.
          </p>
          <form
            className="flex flex-col gap-4 justify-start py-5 text-start"
            action=""
            onSubmit={handleCodeSubmit}
          >
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the verification code"
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
              required
            />
            <button
              type="submit"
              disabled={authLoader}
              className="bg-indigo-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {authLoader ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-xl px-8 py-4 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account 👋
          </h2>
          <p className="text-gray-500 mb-6">Sign up to get started</p>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg hover:shadow-md transition-all duration-200"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google Icon"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign up with Google
            </span>
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-start py-5 text-start"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoader}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {authLoader ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="py-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
