import { create } from "zustand";
import axiosInstance from "../lib/axios";

interface QrCode {
    _id: string;
    title: string;
    originalUrl: string;
    qrCodeLink: string;
    createdAt: string;
}

interface QrCodeStoreInterface {
    qrCodes: QrCode[];
    createQrCode: (newQrCode: QrCode) => void;
    deleteQrCode: (id: string) => void;
}

const useQrCodeStore = create<QrCodeStoreInterface>((set) => ({
    qrCodes: [],
    createQrCode: (newQrCode: QrCode) => {
        try {
            await axiosInstance
        } catch (error) {
            
        }
        set((state) => ({
            qrCodes: [newQrCode, ...state.qrCodes],
        }))
    },
    deleteQrCode: (id: string) => {
        set((state) => ({
            qrCodes: state.qrCodes.filter((qrCode) => qrCode._id !== id),
        }))
    },
}));

export default useQrCodeStore;
