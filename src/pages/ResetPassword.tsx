import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // loader for code validation
  const [submitting, setSubmitting] = useState(false); // loader for form submit
  const [error, setError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      if (!userId || !code) return;
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/auth/check-password-reset-details?userId=${userId}&code=${code}`
        );
        console.log("Reset password request successful:", response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching reset password request:", error);
        setError(
          error.response?.data?.msg || "Failed to verify reset password request"
        );
        setLoading(false);
      }
    };
    fetchRequest();
  }, [userId, code]);

  if (!userId || !code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
        <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Request</h2>
          <p className="text-gray-500 mb-6">
            Please provide a valid user ID and code to reset your password.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      await axiosInstance.post("/api/v1/auth/forgot-password-change-password", {
        userId,
        code,
        newPassword,
        confirmPassword,
      });

      toast.success(
        "Password reset successfully. You can now log in with your new password."
      );
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Failed to reset password");
      setError(error.response?.data?.msg || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
      <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Reset Password 🔑
        </h2>
        <p className="text-gray-500 mb-6">
          Enter your new password to reset it
        </p>

        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
          </div>
        ) : error ? (
          <p className="text-red-500 font-medium mb-4">{error}</p>
        ) : (
          <form
            className="flex flex-col gap-4 text-start py-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="new-password">New Password:</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
