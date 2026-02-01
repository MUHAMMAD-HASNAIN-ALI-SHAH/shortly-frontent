import { create } from "zustand";

interface FormState {
  shortUrlInputs: {
    title: string;
    url: string;
    password: string;
  };
  qrCodeInputs: {
    title: string;
    url: string;
  };
  handleShortUrlInputChange: (field: string, value: string) => void;
  resetShortUrlInputs: () => void;
  handleQrCodeInputChange: (field: string, value: string) => void;
  resetQrCodeInputs: () => void;
}

const useFormStore = create<FormState>((set) => ({
  shortUrlInputs: {
    title: "",
    url: "",
    password: "",
  },
  qrCodeInputs: {
    title: "",
    url: "",
  },
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
