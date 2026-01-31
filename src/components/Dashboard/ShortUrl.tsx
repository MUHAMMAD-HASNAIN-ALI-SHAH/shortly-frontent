import { Copy, Link2, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import useLoadingStore from "../../store/useLoadingStore";
import useNavigationStore from "../../store/useNavigationStore";
import useFormStore from "../../store/useFormStore";
import useLimitStore from "../../store/useLimitStore";
import useShortUrlStore from "../../store/useShortUrlStore";

const ShortUrl = () => {
  const { shortUrlNavigation } = useNavigationStore();
  const { getShortUrls } = useShortUrlStore();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getShortUrls();
  }, [getShortUrls]);

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {shortUrlNavigation === "short-url" ? (
        <>
          <ShortUrlHeader
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <hr className="my-5 border-t border-blue-200" />

          <ShortUrlList />
        </>
      ) : (
        <ShortUrlForm />
      )}
    </div>
  );
};

/* ===========================
   Short URL List
=========================== */

const ShortUrlList = () => {
  const { shortUrls } = useShortUrlStore();
  const { getShortUrlsLoader } = useShortUrlStore();

  return (
    <div>
      {getShortUrlsLoader ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-600 size-6" />
        </div>
      ) : shortUrls && shortUrls.length > 0 ? (
        <>
          {shortUrls.map((link: any) => (
            <div
              key={link._id}
              className="flex flex-col lg:flex-row items-center justify-between mb-4 bg-white p-4 rounded-lg shadow-sm gap-4"
            >
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <img
                  src="./web.png"
                  alt="Web Icon"
                  className="w-12 h-12 object-contain"
                />

                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-gray-800">
                    {link.title}
                  </h1>

                  {link.isPasswordProtected && (
                    <p className="text-sm text-red-500 font-medium">
                      🔒 Password Protected
                    </p>
                  )}

                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-semibold text-blue-500 hover:underline break-all"
                  >
                    {link.shortUrl}
                  </a>

                  <p className="text-sm text-gray-600 break-all">
                    {link.originalUrl}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong className="text-red-500">
                      Total Clicks : {link.clicks}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(link.shortUrl);
                    } catch (err) {
                      console.error("Failed to copy:", err);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  <Copy className="w-4 h-4" />
                  Copy
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
          No links found. Create a new link to get started.
        </h1>
      )}
    </div>
  );
};

/* ===========================
   Header
=========================== */

const ShortUrlHeader = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setShortUrlNavigation } = useNavigationStore();

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Shortly Links</h2>
          <p className="text-gray-600">
            Manage and view your created shortly links here.
          </p>
        </div>

        <button
          onClick={() => setShortUrlNavigation("create")}
          className="cursor-pointer border border-blue-200 bg-blue-700 text-white flex items-center gap-3 px-4 py-2 rounded-sm transition"
        >
          <Link2 className="size-4" />
          Create Link
        </button>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search shortly links"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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

const ShortUrlForm = () => {
  const { urlLimit } = useLimitStore();
  const { setShortUrlNavigation } = useNavigationStore();
  const { shortUrlButtonLoading } = useLoadingStore();
  const { handleShortUrlInputChange, shortUrlInputs } = useFormStore();
  const { createShortUrl } = useShortUrlStore();

  const [usePassword, setUsePassword] = useState(false);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <form
        className="relative flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          createShortUrl();
        }}
      >
        <X
          onClick={() => setShortUrlNavigation("short-url")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        />

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Link
          </h2>
          <p className="text-gray-500 mb-1">
            Fill in the details to create a new short link.
          </p>
          <p className="text-sm text-blue-600 font-medium">
            You have <span className="font-bold">{urlLimit}</span> more links
            to create.
          </p>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={shortUrlInputs.title}
            onChange={(e) =>
              handleShortUrlInputChange("title", e.target.value)
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
            value={shortUrlInputs.url}
            onChange={(e) =>
              handleShortUrlInputChange("url", e.target.value)
            }
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Toggle */}
        <div className="mb-5 flex items-center gap-4">
          <p className="text-sm font-medium">Protect with password?</p>

          <button
            type="button"
            onClick={() => setUsePassword(true)}
            className={`px-4 py-2 rounded ${
              usePassword ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            onClick={() => {
              setUsePassword(false);
              handleShortUrlInputChange("password", "");
            }}
            className={`px-4 py-2 rounded ${
              !usePassword ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            No
          </button>
        </div>

        {usePassword && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={shortUrlInputs.password}
              onChange={(e) =>
                handleShortUrlInputChange("password", e.target.value)
              }
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <p className="text-sm text-blue-600 mb-6 font-medium">
          You have <span className="font-bold">{urlLimit}</span> more QR
          codes available.
        </p>

        <button
          type="submit"
          disabled={shortUrlButtonLoading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            shortUrlButtonLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Add Link
        </button>
      </form>
    </div>
  );
};

export default ShortUrl;
