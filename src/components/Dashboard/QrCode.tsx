import { Copy, Delete, Edit, Loader2, QrCode as QrIcon, X } from "lucide-react";
import useLinkStore from "../../store/useLinkStore";
import useLoadingStore from "../../store/useLoadingStore";
import useFormStore from "../../store/useFormStore";
import useNavigationStore from "../../store/useNavigationStore";
import { useState } from "react";

const QrCode = () => {
  const [searchText, setSearchText] = useState("");
  const { links, handleQrSubmit, qrLimit } = useLinkStore();
  const getQrCodes = links
    .filter((link: any) => link.type === "qr-code")
    .filter((link: any) =>
      link.title.toLowerCase().includes(searchText.toLowerCase())
    );
  const { fetchLinksLoader } = useLoadingStore();
  const { qrNavigation, setQrNavigation } = useNavigationStore();
  const { handleQrInputChange, qrInputs } = useFormStore();
  const { qrButtonLoading } = useLoadingStore();

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {qrNavigation === "qr" ? (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Shortly QR Codes</h2>
              <p className="text-gray-600">
                Manage and view your created shortly QR codes here.
              </p>
            </div>
            <button
              onClick={() => setQrNavigation("create")}
              className="cursor-pointer border text-nowrap border-blue-200 bg-blue-700 text-white flex items-center gap-3 px-4 py-2 rounded-sm transition"
            >
              <QrIcon className="size-4" />
              Create QR Code
            </button>
          </div>

          <div className="mt-5">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search shortly QR codes"
              className="w-64 px-4 py-2 border border-blue-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="cursor-pointer ml-2 bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          <hr className="my-5 border-t border-blue-200" />

          <div>
            {fetchLinksLoader ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-blue-600 size-6" />
              </div>
            ) : getQrCodes && getQrCodes.length > 0 ? (
              <>
                {getQrCodes.map((qr: any) => (
                  <div
                    key={qr._id}
                    className="flex flex-col gap-5 lg:flex-row items-start justify-between mb-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={qr.qrCodeLink}
                        alt="QR"
                        className="h-36 w-36 object-contain border p-2 rounded-md"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-lg font-bold">
                          {qr.title || "Untitled"}
                        </h1>
                        <h3 className="text-md font-semibold text-blue-500">
                          {qr.shortUrl || "No short link"}
                        </h3>
                        <h2 className="text-lg text-gray-700">
                          {qr.originalUrl || "No original URL"}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="cursor-pointer border border-blue-200 flex items-center gap-3 text-black px-4 py-2 rounded-sm transition">
                        <Copy className="size-4" />
                        Copy
                      </button>
                      <button className="cursor-pointer border border-blue-200 flex items-center gap-3 text-black px-4 py-2 rounded-sm transition">
                        <Edit className="size-4" />
                        Edit
                      </button>
                      <button className="cursor-pointer border border-blue-200 flex items-center gap-3 text-black px-4 py-2 rounded-sm transition">
                        <Delete className="size-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <h1 className="text-center text-gray-500">
                  You are at the end of list
                </h1>
              </>
            ) : (
              <h1 className="text-center text-gray-500">
                No QR codes found. Create one to get started.
              </h1>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg relative">
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleQrSubmit();
            }}
          >
            <X
              onClick={() => setQrNavigation("qr")}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create QR Code
              </h2>
              <p className="text-gray-500 mb-1">
                Fill in the details to generate a new QR code.
              </p>
              <p className="text-sm text-blue-600 font-medium">
                You have <span className="font-bold">{qrLimit}</span> more QR codes
                available.
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={qrInputs.title}
                onChange={(e) => handleQrInputChange("title", e.target.value)}
                placeholder="Enter the title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL
              </label>
              <input
                type="text"
                id="url"
                value={qrInputs.url}
                onChange={(e) => handleQrInputChange("url", e.target.value)}
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <p className="text-sm text-blue-600 mb-6 font-medium">
              You have <span className="font-bold">{qrLimit}</span> more qr codes
              available.
            </p>

            <div>
              <button
                type="submit"
                disabled={qrButtonLoading}
                className={`w-full ${
                  qrButtonLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 rounded-lg font-semibold transition duration-200`}
              >
                Generate QR Code
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default QrCode;
