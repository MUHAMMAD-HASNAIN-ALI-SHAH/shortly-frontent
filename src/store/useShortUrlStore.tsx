import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import useNavigationStore from "./useNavigationStore";
import useFormStore from "./useFormStore";
import useLoadingStore from "./useLoadingStore";
import useLimitStore from "./useLimitStore";
import useAuthStore from "./useAuthStore";

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
            console.log("Creating short URL with inputs:", shortUrlInputs);
            if (!shortUrlInputs.url) {
                toast.error("Please enter a valid URL and title");
                console.log("Invalid URL input");
                return;
            }
            useLoadingStore.getState().setShortUrlButtonLoading(true);
            const res = await axiosInstance.post("/api/v2/short-url", {
                originalUrl: shortUrlInputs.url,
                title: shortUrlInputs.title,
                password: shortUrlInputs.password || undefined,
            });
            set((state) => ({ shortUrls: [res.data.result, ...state.shortUrls] }));
            useLimitStore.getState().reduceLimit("short-url");
            useNavigationStore.getState().setSidebarMenu("short-url");
            useNavigationStore.getState().setShortUrlNavigation("short-url");
            useFormStore.getState().resetShortUrlInputs();
            useLoadingStore.getState().setShortUrlButtonLoading(false);
            toast.success("Short URL created successfully");
        } catch (err: any) {
            if(err.response?.status === 403){
                useAuthStore.getState().logout();
            }
            toast.error(err?.response?.data?.message || "Failed to create short URL");
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
            if(err.response?.status === 403){
                useAuthStore.getState().logout();
            }
            toast.error(err?.response?.data?.message || "Failed to load short URLs");
            set({ getShortUrlsError: { message: err?.response?.data?.message || "Failed to load short URLs", status: true } });
        } finally {
            useLoadingStore.getState().setFetchLinksLoader(false);
            set({ getShortUrlsLoader: false });
        }
    }
}));

export default useShortUrlStore;
