import { Download, Loader2, QrCode as QrIcon, X } from "lucide-react";
import { useState } from "react";

import useFormStore from "../../store/useFormStore";
import useLimitStore from "../../store/useLimitStore";
import useLoadingStore from "../../store/useLoadingStore";
import useNavigationStore from "../../store/useNavigationStore";
import useQrCodeStore from "../../store/useQrCodeStore";

const QrCode = () => {
  const { qrCodeNavigation } = useNavigationStore();

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {qrCodeNavigation === "qr-code" ? (
        <>
          <QrCodeHeader />
          <hr className="my-5 border-t border-blue-200" />
          <QrCodeList />
        </>
      ) : (
        <QrCodeCreateForm />
      )}
    </div>
  );
};

/* ===========================
   QR Code List
=========================== */

const QrCodeList = () => {
  const { qrCodes, getQrCodesLoader } = useQrCodeStore();

  const handleDownload = async (
    url: string,
    filename: string = "qr-code.png"
  ) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  return (
    <div>
      {getQrCodesLoader ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600 size-6" />
        </div>
      ) : qrCodes && qrCodes.length > 0 ? (
        <>
          {qrCodes.map((qr: any) => (
            <div
              key={qr._id}
              className="flex flex-col lg:flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-sm gap-4"
            >
              {/* Left */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <img
                  src={qr.qrCodeLink}
                  alt="QR Code"
                  className="h-36 w-36 object-contain border p-2 rounded-md"
                />

                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-gray-800">
                    {qr.title || "Untitled"}
                  </h1>

                  <h3 className="text-md font-semibold text-blue-500 break-all">
                    {qr.shortUrl || "No short link"}
                  </h3>

                  <p className="text-sm text-gray-600 break-all">
                    {qr.originalUrl || "No original URL"}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex-shrink-0">
                <button
                  onClick={() =>
                    handleDownload(
                      qr.qrCodeLink,
                      `${qr.title || "qr-code"}.png`
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
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
  );
};

/* ===========================
   Header
=========================== */

const QrCodeHeader = () => {
  const [searchText, setSearchText] = useState("");
  const { setQrCodeNavigation } = useNavigationStore();

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Shortly QR Codes</h2>
          <p className="text-gray-600">
            Manage and view your created shortly QR codes here.
          </p>
        </div>

        <button
          onClick={() => setQrCodeNavigation("create")}
          className="border border-blue-200 bg-blue-700 text-white flex items-center gap-3 px-4 py-2 rounded-sm transition"
        >
          <QrIcon className="size-4" />
          Create QR Code
        </button>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search shortly QR codes"
          className="w-full sm:w-64 px-4 py-2 border border-blue-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />

        <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition">
          Search
        </button>
      </div>
    </>
  );
};

/* ===========================
   Create Form
=========================== */

const QrCodeCreateForm = () => {
  const { handleQrCodeInputChange, qrCodeInputs } = useFormStore();
  const { qrCodeButtonLoading } = useLoadingStore();
  const { createQrCode } = useQrCodeStore();
  const { qrCodeLimit } = useLimitStore();
  const { setQrCodeNavigation } = useNavigationStore();

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg relative">
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          createQrCode();
        }}
      >
        <X
          onClick={() => setQrCodeNavigation("qr-code")}
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
            You have <span className="font-bold">{qrCodeLimit}</span> more QR
            codes available.
          </p>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={qrCodeInputs.title}
            onChange={(e) =>
              handleQrCodeInputChange("title", e.target.value)
            }
            placeholder="Enter the title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* URL */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL
          </label>
          <input
            type="text"
            value={qrCodeInputs.url}
            onChange={(e) =>
              handleQrCodeInputChange("url", e.target.value)
            }
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-sm text-blue-600 mb-6 font-medium">
          You have <span className="font-bold">{qrCodeLimit}</span> more QR
          codes available.
        </p>

        <button
          type="submit"
          disabled={qrCodeButtonLoading}
          className={`w-full py-2 rounded-lg font-semibold transition ${qrCodeButtonLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
        >
          {qrCodeButtonLoading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Generating...
            </span>
          ) : (
            "Generate QR Code"
          )}
        </button>
      </form>
    </div>
  );
};

export default QrCode;
