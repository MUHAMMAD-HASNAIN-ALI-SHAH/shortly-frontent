import { useState, useRef } from "react";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, changePassword } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState(user?.picture);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.newPassword.length < 8) {
      toast.error("Password must be 8 digits long");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password not matched with confirm password");
      return;
    }
    changePassword(formData).then((status: number) => {
      if (status === 1) {
        toast.success("Password updated successfully");
      }
    });
    setFormData({
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setProfilePic(base64);

      // You can now send this base64 to your backend
      console.log("Base64 Image:", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src={profilePic}
            alt="Profile"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer hover:opacity-80"
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-black text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Change Password Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-medium text-black">Change Password</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-black">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
