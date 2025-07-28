import { Copy, Delete, Link2, Loader2, X } from "lucide-react";
import useLinkStore from "../../store/useLinkStore";
import useLoadingStore from "../../store/useLoadingStore";
import useNavigationStore from "../../store/useNavigationStore";
import useFormStore from "../../store/useFormStore";
import { useState } from "react";

const Link = () => {
  const { links, handleUrlSubmit, urlLimit } = useLinkStore();
  const { urlsNavigation, setUrlsNavigation } = useNavigationStore();
  const { fetchLinksLoader, urlButtonLoading } = useLoadingStore();
  const { handleUrlsInputChange, urlsInputs } = useFormStore();
  const [searchText, setSearchText] = useState("");
  const getLinks = links
    .filter((link: any) => link.type === "short-url")
    .filter((link: any) =>
      link.title.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {urlsNavigation === "link" ? (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Shortly Links</h2>
              <p className="text-gray-600">
                Manage and view your created shortly links here.
              </p>
            </div>
            <button
              onClick={() => setUrlsNavigation("create")}
              className="cursor-pointer border text-nowrap border-blue-200 bg-blue-700 text-white flex items-center gap-3 px-4 py-2 rounded-sm transition"
            >
              <Link2 className="size-4" />
              Create Link
            </button>
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search shortly links"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
            ) : getLinks && getLinks.length > 0 ? (
              <>
                {getLinks.map((link: any) => {
                  return (
                    <div
                      key={link._id}
                      className="flex flex-col gap-5 lg:flex-row items-start justify-between mb-4 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <img src="./web.png" alt="Web Icon" />
                        <div className="flex flex-col">
                          <h1 className="text-lg font-bold">{link.title}</h1>
                            <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-md font-semibold text-blue-500 hover:underline"
                            >
                            {link.shortUrl}
                            </a>
                          <h2 className="text-lg">{link.originalUrl}</h2>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="cursor-pointer border border-blue-200 flex items-center gap-3 text-black px-4 py-2 rounded-sm transition">
                          <Copy className="size-4" />
                          Copy
                        </button>
                        <button className="cursor-pointer border border-blue-200 flex items-center gap-3 text-black px-4 py-2 rounded-sm transition">
                          <Delete className="size-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
                <h1 className="text-center text-gray-500">
                  You are at the end of list
                </h1>
              </>
            ) : (
              <div>
                <h1 className="text-center text-gray-500">
                  No links found. Create a new link to get started.
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-lg">
          <form
            className="relative flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleUrlSubmit();
            }}
          >
            <X
              onClick={() => setUrlsNavigation("link")}
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
                You have <span className="font-bold">{urlLimit}</span> more links to
                create.
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
                onChange={(e) => handleUrlsInputChange("title", e.target.value)}
                value={urlsInputs.title}
                type="text"
                id="title"
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
                onChange={(e) => handleUrlsInputChange("url", e.target.value)}
                value={urlsInputs.url}
                type="text"
                id="url"
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <p className="text-sm text-blue-600 mb-6 font-medium">
              You have <span className="font-bold">{urlLimit}</span> more QR codes
              available.
            </p>

            <div>
              <button
                type="submit"
                className={`w-full ${
                  urlButtonLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 rounded-lg font-semibold transition duration-200`}
                disabled={urlButtonLoading}
              >
                Add Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Link;
