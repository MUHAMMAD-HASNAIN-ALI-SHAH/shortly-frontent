import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface LimitStoreInterface {
    shortUrlLimit: number;
    qrCodeLimit: number;
    limitLoader: boolean;
    getLimitError: {
        message: string;
        status: boolean;
    }
    getLimit: () => void;
    reduceLimit: (type: "short-url" | "qr-code") => void;
}

const useLimitStore = create<LimitStoreInterface>((set) => ({
    shortUrlLimit: 0,
    qrCodeLimit: 0,
    limitLoader: true,
    getLimitError: {
        message: "",
        status: false,
    },
    getLimit: async () => {
        try {
            set({ limitLoader: true });
            const res = await axiosInstance.get("/api/v4/limit");
            set({ shortUrlLimit: res.data.urls, qrCodeLimit: res.data.qrCodes });
        } catch (err: any) {
            toast.error(err?.response?.data?.msg || "Failed to get limits");
            set({
                getLimitError: {
                    message: err?.response?.data?.msg || "Failed to get limits",
                    status: true,
                },
            });
        } finally {
            set({ limitLoader: false });
        }
    },
    reduceLimit: (type: "short-url" | "qr-code") => {
        if (type === "short-url") {
            set((state) => ({ shortUrlLimit: state.shortUrlLimit - 1 }));
        } else if (type === "qr-code") {
            set((state) => ({ qrCodeLimit: state.qrCodeLimit - 1 }));
        }
    },
}));

export default useLimitStore;
