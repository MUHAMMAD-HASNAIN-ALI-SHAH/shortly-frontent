import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface LimitStoreInterface {
    urlLimit: number;
    qrLimit: number;
    limitLoader: boolean;
    getLimitError: {
        message: string;
        status: boolean;
    }
    getLimit: () => void;
}

const useLimitStore = create<LimitStoreInterface>((set) => ({
    urlLimit: 0,
    qrLimit: 0,
    limitLoader: true,
    getLimitError: {
        message: "",
        status: false,
    },
    getLimit: async () => {
        try {
            set({ limitLoader: true });
            const res = await axiosInstance.get("/api/v4/limit");
            set({ urlLimit: res.data.urls, qrLimit: res.data.qrCodes });
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
}));

export default useLimitStore;
