import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import useNavigationStore from "./useNavigationStore";
import useFormStore from "./useFormStore";
import useLoadingStore from "./useLoadingStore";

interface QrCode {
    _id: string;
    title: string;
    originalUrl: string;
    qrCodeLink: string;
    createdAt: string;
}

interface QrCodeStoreInterface {
    qrCodes: QrCode[];
    getQrCodesLoader: boolean;
    getQrCodesError: {
        message: string;
        status: boolean;
    }
    createQrCode: () => Promise<void>;
    getQrCodes: () => Promise<void>;
}

const useQrCodeStore = create<QrCodeStoreInterface>((set, get) => ({
    qrCodes: [],
    getQrCodesLoader: false,
    getQrCodesError: {
        message: "",
        status: false,
    },
    createQrCode: async () => {
        try {
            const { qrCodeInputs } = useFormStore.getState();
            if (!qrCodeInputs.url || !qrCodeInputs.title) {
                toast.error("Please enter a valid URL and title");
                return;
            }
            useLoadingStore.getState().setQrCodeButtonLoading(true);
            const res = await axiosInstance.post("/api/v3/qr-code", {
                originalUrl: qrCodeInputs.url,
                title: qrCodeInputs.title,
            });
            set((state) => ({ qrCodes: [res.data.result, ...state.qrCodes] }));
            useNavigationStore.getState().setQrCodeNavigation("qr");
            useFormStore.getState().resetQrCodeInputs();
            useLoadingStore.getState().setQrCodeButtonLoading(false);
            toast.success("QR Code generated successfully");
        } catch (err: any) {
            console.error("Error creating QR code:", err);
            toast.error(err?.response?.data?.msg || "Failed to create QR code");
        } finally {
            useLoadingStore.getState().setQrCodeButtonLoading(false);
        }
    },
    getQrCodes: async () => {
        try {
            if (useQrCodeStore.getState().getQrCodesLoader) return;
            set({ getQrCodesLoader: true });
            if (get().qrCodes.length > 0) {
                set({ getQrCodesLoader: false });
                return;
            }
            useLoadingStore.getState().setFetchLinksLoader(true);
            const res = await axiosInstance.get("/api/v3/qr-code");
            set({ qrCodes: res.data.qrCodes });
        } catch (err: any) {
            toast.error(err?.response?.data?.msg || "Failed to load QR codes");
            set({ getQrCodesError: { message: err?.response?.data?.msg || "Failed to load QR codes", status: true } });
        } finally {
            useLoadingStore.getState().setFetchLinksLoader(false);
            set({ getQrCodesLoader: false });
        }
    }
}));

export default useQrCodeStore;
