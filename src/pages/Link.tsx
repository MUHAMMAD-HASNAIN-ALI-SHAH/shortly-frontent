import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

// interface LinkData {
//   index: number;
//   userId: string;
//   title: string;
//   originalUrl: string;
//   shortUrl: string;
//   clicks: number;
//   isPasswordProtected: boolean;
//   password?: string;
// }

const Link: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

  // const fetchedRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/v2/short-url/redirect?index=${id}`
        );

        if (!res.data.isPasswordProtected) {
          redirectToOriginalUrl(res.data.originalUrl);
        } else {
          setShowPasswordForm(true);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Link not found or expired.");
        setLoading(false);
      }
    };

    if (id) fetchLink();
  }, [id]);


  const redirectToOriginalUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    window.location.href = url;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!password) {
      setPasswordError("Please enter password");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/api/v2/short-url/verify-password`,
        { index: id, password }
      );

      redirectToOriginalUrl(res.data.originalUrl);
    } catch (err: any) {
      setPasswordError(
        err.response?.data?.message || "Incorrect password"
      );
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700 font-semibold animate-pulse">
          Redirecting...
        </p>
      </div>
    );
  }

  if (showPasswordForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Password Protected Link
          </h2>
          <p className="text-gray-600 text-center mb-6">
            This link is protected. Enter the password to continue.
          </p>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {passwordError && <p className="text-red-500 text-sm text-center">{passwordError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Unlock Link
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        {error && (
          <>
            <h2 className="text-red-600 font-bold text-xl mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Link;
