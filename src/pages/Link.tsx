import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

const Link = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOriginalLink = async () => {
      try {
        const response = await axiosInstance.get(`/api/v2/link/redirect?index=${id}`);
        let originalUrl = response.data?.originalUrl;

        if (!originalUrl) {
          setError("No original URL found.");
          setLoading(false);
          return;
        }

        // Prepend https:// if it's missing
        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
          originalUrl = "https://" + originalUrl;
        }

        window.location.href = originalUrl;
      } catch (err) {
        console.error("Redirect error:", err);
        setError("Something went wrong while fetching the link.");
        setLoading(false);
      }
    };

    if (id) {
      fetchOriginalLink();
    } else {
      setError("Missing link ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700 font-semibold animate-pulse">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-red-600 font-bold text-lg mb-2">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    </div>
  );
};

export default Link;
