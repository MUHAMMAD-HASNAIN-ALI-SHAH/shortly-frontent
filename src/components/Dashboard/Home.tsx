import { Link2, ScanBarcode, Loader2 } from "lucide-react";
import useLinkStore from "../../store/useLinkStore";
import useNavigationStore from "../../store/useNavigationStore";
import useFormStore from "../../store/useFormStore";
import useLoadingStore from "../../store/useLoadingStore";

const Home = () => {
  const { urlLimit, qrLimit, previewLink, handleQuickCreateSubmit } =
    useLinkStore();
  const { quickCreateInput, handlequickCreateInput } = useFormStore();
  const { quickCreate, setQuickCreate } = useNavigationStore();
  const { quickCreateButtonLoading } = useLoadingStore();

  return (
    <div className="w-full p-5">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold">Welcome to shortly</h1>
        <h3 className="text-xl font-semibold">
          Start creating your links or QR code with shortly
        </h3>
      </header>

      {/* Intro */}
      <div className="mt-5 text-gray-600">
        Shortly lets you shorten URLs & generate QR codes with management &
        tracking.
      </div>

      {/* Quick Create Box */}
      <div className="w-full m-5 mx-0 p-5 bg-white rounded-lg shadow-md">
        {/* Toggle Buttons */}
        <header className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Quick Create</h1>
          <div className="flex flex-col gap-5 sm:flex-row items-center space-x-7 sm:space-x-4">
            <button
              onClick={() => setQuickCreate("link")}
              className={`flex items-center px-4 py-2 rounded-full cursor-pointer text-nowrap ${
                quickCreate === "link"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-300 text-black"
              } transition`}
              disabled={quickCreateButtonLoading}
            >
              <Link2 className="w-5 h-5 mr-2 rotate-45" />
              Create Link
            </button>
            <button
              onClick={() => setQuickCreate("qr")}
              className={`flex items-center px-4 py-2 rounded-full cursor-pointer text-nowrap ${
                quickCreate === "qr"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-300 text-black"
              } transition`}
              disabled={quickCreateButtonLoading}
            >
              <ScanBarcode className="w-5 h-5 mr-2 rotate-45" />
              Create QR Code
            </button>
          </div>
        </header>

        {/* Input Section */}
        <div className="mt-5">
          <p className="text-sm font-semibold">
            {quickCreate === "link"
              ? `You can create ${urlLimit} more short links`
              : `You can create ${qrLimit} more QR codes`}
          </p>
          <div className="mt-5">
            <label className="font-semibold">Enter your destination URL</label>
            <div className="w-full flex flex-col md:flex-row gap-5 mt-2">
              <input
                type="text"
                value={quickCreateInput}
                onChange={(e) => handlequickCreateInput(e.target.value)}
                className="w-full border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-600 px-3 py-2"
                placeholder="Enter your destination URL"
                disabled={quickCreateButtonLoading}
              />
              <button
                onClick={handleQuickCreateSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition whitespace-nowrap flex items-center justify-center min-w-[170px]"
                disabled={quickCreateButtonLoading}
              >
                {quickCreateButtonLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 size-4" />
                    Processing...
                  </>
                ) : quickCreate === "link" ? (
                  "Create Short Link"
                ) : (
                  "Generate QR Code"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {previewLink && previewLink.type === "short-url" && (
        <div className="flex flex-col gap-5 lg:flex-row items-start justify-between mb-4 bg-white p-4 rounded-lg shadow-sm mt-5">
          <div className="flex items-center space-x-2">
            <img src="./web.png" alt="Web Icon" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{previewLink.title}</h1>
              <h3 className="text-md font-semibold text-blue-500">
                {previewLink.shortUrl}
              </h3>
              <h2 className="text-lg">{previewLink.originalUrl}</h2>
            </div>
          </div>
        </div>
      )}

      {previewLink && previewLink.type === "qr-code" && (
        <div className="flex flex-col gap-5 lg:flex-row items-start justify-between mb-4 bg-white p-4 rounded-lg shadow-sm mt-5">
          <div className="flex items-center space-x-2">
            <img src={previewLink.qrCodeLink} className="h-36" alt="QR Code" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{previewLink.title}</h1>
              <h2 className="text-lg font-semibold">
                {previewLink.originalUrl}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
