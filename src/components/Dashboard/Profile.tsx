import useAuthStore from "../../store/useAuthStore";
import useLimitStore from "../../store/useLimitStore";

const Profile = () => {
  const { user } = useAuthStore();
  const { shortUrlLimit, qrCodeLimit } = useLimitStore();

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700">
            {user?.username?.charAt(0) ?? "U"}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.username || "Unknown User"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email || "No email provided"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Account Limits */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Account Limits
          </h2>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-sm text-gray-600">Short URL Limit</span>
            <span className="font-semibold text-gray-800">
              {shortUrlLimit}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-sm text-gray-600">QR Code Limit</span>
            <span className="font-semibold text-gray-800">
              {qrCodeLimit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
