import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import useNavigationStore from "./useNavigationStore";
import useFormStore from "./useFormStore";
import useLoadingStore from "./useLoadingStore";

interface ShortUrl {
    _id: string;
    title: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
}

interface ShortUrlStoreInterface {
    shortUrls: ShortUrl[];
    getShortUrlsLoader: boolean;
    getShortUrlsError: {
        message: string;
        status: boolean;
    }
    createShortUrl: () => Promise<void>;
    getShortUrls: () => Promise<void>;
}

const useShortUrlStore = create<ShortUrlStoreInterface>((set, get) => ({
    shortUrls: [],
    getShortUrlsLoader: false,
    getShortUrlsError: {
        message: "",
        status: false,
    },
    createShortUrl: async () => {
        try {
            const { shortUrlInputs } = useFormStore.getState();
            if (!shortUrlInputs.url || !shortUrlInputs.title) {
                toast.error("Please enter a valid URL and title");
                return;
            }
            useLoadingStore.getState().setShortUrlButtonLoading(true);
            const res = await axiosInstance.post("/api/v2/short-url", {
                originalUrl: shortUrlInputs.url,
                title: shortUrlInputs.title,
            });
            set((state) => ({ shortUrls: [res.data.result, ...state.shortUrls] }));
            useNavigationStore.getState().setShortUrlNavigation("short-url");
            useFormStore.getState().resetShortUrlInputs();
            useLoadingStore.getState().setShortUrlButtonLoading(false);
            toast.success("Short URL created successfully");
        } catch (err: any) {
            console.error("Error creating short URL:", err);
            toast.error(err?.response?.data?.msg || "Failed to create short URL");
        } finally {
            useLoadingStore.getState().setShortUrlButtonLoading(false);
        }
    },
    getShortUrls: async () => {
        try {
            if (useShortUrlStore.getState().getShortUrlsLoader) return;
            set({ getShortUrlsLoader: true });
            if (get().shortUrls && get().shortUrls.length > 0) {
                set({ getShortUrlsLoader: false });
                return;
            }
            useLoadingStore.getState().setFetchLinksLoader(true);
            const res = await axiosInstance.get("/api/v2/short-url");
            set({ shortUrls: res.data.shortUrls });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.response?.data?.msg || "Failed to load short URLs");
            set({ getShortUrlsError: { message: err?.response?.data?.msg || "Failed to load short URLs", status: true } });
        } finally {
            useLoadingStore.getState().setFetchLinksLoader(false);
            set({ getShortUrlsLoader: false });
        }
    }
}));

export default useShortUrlStore;
