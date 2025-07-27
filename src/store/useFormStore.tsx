import { create } from "zustand";

interface FormState {
  quickCreateInput: string;
  urlsInputs: {
    title: string;
    url: string;
  };
  qrInputs: {
    title: string;
    url: string;
  };
  handlequickCreateInput: (value: string) => void;
  handleUrlsInputChange: (field: string, value: string) => void;
  resetUrlsInputs: () => void;
  handleQrInputChange: (field: string, value: string) => void;
  resetQrInputs: () => void;
}

const useFormStore = create<FormState>((set) => ({
  quickCreateInput: "",
  urlsInputs: {
    title: "",
    url: "",
  },
  qrInputs: {
    title: "",
    url: "",
  },
  handlequickCreateInput: (value: string) => set({ quickCreateInput: value }),
  handleUrlsInputChange: (field: string, value: string) => {
    set((state) => ({
      urlsInputs: {
        ...state.urlsInputs,
        [field]: value,
      },
    }));
  },
  resetUrlsInputs: () =>
    set({
      urlsInputs: {
        title: "",
        url: "",
      },
    }),
  handleQrInputChange: (field: string, value: string) => {
    set((state) => ({
      qrInputs: {
        ...state.qrInputs,
        [field]: value,
      },
    }));
  },
  resetQrInputs: () =>
    set({
      qrInputs: {
        title: "",
        url: "",
      },
    }),
}));

export default useFormStore;
