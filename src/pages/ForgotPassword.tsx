const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-200 to-gray-300 px-4">
      <div className="bg-white rounded-md shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password? 🔒
        </h2>
        <p className="text-gray-500 mb-6">
          Enter your email to reset your password
        </p>

        <form className="flex flex-col gap-4 text-start py-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
