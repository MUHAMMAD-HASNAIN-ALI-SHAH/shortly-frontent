import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 to-sky-100 text-gray-800">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center shadow-md bg-white">
        <h1 className="text-2xl font-bold text-blue-600">Shortly</h1>
        <div className="space-x-4">
          {!isAuthenticated && (
            <Link to="/login">
              <button className="cursor-pointer border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-4 py-2 rounded">
                Login
              </button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/dashboard">
              <button className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded">
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-6 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Shorten Links & Create QR Codes in Seconds
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-600">
            Say goodbye to long URLs. Generate custom short links and stylish QR
            codes — fast, secure, and trackable.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-semibold mb-4">URL Generator</h3>
            <p className="text-gray-600 text-lg">
              Manage your shortened URLs, track clicks, and organize your links
              in one powerful dashboard.
            </p>
          </div>
          <div>
            <img
              src="/dashboard.png"
              alt="URL Dashboard"
              className="w-full rounded-xl shadow-md border-2 border-gray-300"
            />
          </div>
        </div>
      </section>

      {/* QR Dashboard Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/qr-dashboard.png"
              alt="QR Dashboard"
              className="w-full rounded-xl shadow-md border-2 border-gray-300"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl font-semibold mb-4">QR Code Generator</h3>
            <p className="text-gray-600 text-lg">
              Create scannable QR codes for any link. Download, customize, and
              use them wherever needed.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-sky-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Instant URL Shortening</h3>
            <p className="text-gray-600">
              Paste any long URL and get a unique short link you can share
              anywhere. Simple, fast, and reliable.
            </p>
          </div>
          <div className="p-6 bg-sky-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">
              Stylish QR Code Generator
            </h3>
            <p className="text-gray-600">
              Automatically generate QR codes for your links. Download and use
              them on websites, flyers, or anywhere.
            </p>
          </div>
          <div className="p-6 bg-sky-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">Analytics & History</h3>
            <p className="text-gray-600">
              View click counts and manage your previously created links and QR
              codes from a powerful dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Start Shortening and Scanning Now
          </h2>
          <p className="text-lg mb-8">
            No sign-up required. Jump straight in and create your first link or
            QR code with Shortly.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:shadow-xl transition"
          >
            Try it Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 md:px-16 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Shortly. All rights reserved.</p>
        <div className="text-sm mt-2 text-gray-400">
          Built with ❤️ by Hasnain
        </div>
      </footer>
    </div>
  );
};

export default Home;
