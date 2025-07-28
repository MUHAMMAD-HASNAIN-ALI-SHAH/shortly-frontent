import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoader(true);
    axiosInstance
      .post("/api/v1/auth/request-password-reset", { email })
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        console.error("Error sending reset email:", error);
        toast.error(error.response?.data?.msg || "Failed to send reset email");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
      {!sent && (
        <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Forgot Password? 🔒
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your email to reset your password
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-start py-5"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {loader ? (
                <>
                  <Loader2 className="inline mr-2 size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      )}
      {sent && (
        <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Email Sent! 📧
          </h2>
          <p className="text-gray-500 mb-6">
            Please check your inbox for the password reset link.
          </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
