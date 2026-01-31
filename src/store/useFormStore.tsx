import { create } from "zustand";

interface FormState {
  quickCreateInput: string;
  shortUrlInputs: {
    title: string;
    url: string;
    password: string;
  };
  qrCodeInputs: {
    title: string;
    url: string;
  };
  handlequickCreateInput: (value: string) => void;
  handleShortUrlInputChange: (field: string, value: string) => void;
  resetShortUrlInputs: () => void;
  handleQrCodeInputChange: (field: string, value: string) => void;
  resetQrCodeInputs: () => void;
}

const useFormStore = create<FormState>((set) => ({
  quickCreateInput: "",
  shortUrlInputs: {
    title: "",
    url: "",
    password: "",
  },
  qrCodeInputs: {
    title: "",
    url: "",
  },
  handlequickCreateInput: (value: string) => set({ quickCreateInput: value }),
  handleShortUrlInputChange: (field: string, value: string) => {
    set((state) => ({
      shortUrlInputs: {
        ...state.shortUrlInputs,
        [field]: value,
      },
    }));
  },
  resetShortUrlInputs: () =>
    set({
      shortUrlInputs: {
        title: "",
        url: "",
        password: "",
      },
    }),
  handleQrCodeInputChange: (field: string, value: string) => {
    set((state) => ({
      qrCodeInputs: {
        ...state.qrCodeInputs,
        [field]: value,
      },
    }));
  },
  resetQrCodeInputs: () =>
    set({
      qrCodeInputs: {
        title: "",
        url: "",
      },
    }),
}));

export default useFormStore;
