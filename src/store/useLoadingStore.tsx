import { create } from "zustand";

interface LoadingState {
  quickCreateButtonLoading: boolean;
  fetchLinksLoader: boolean;
  shortUrlButtonLoading: boolean;
  qrCodeButtonLoading: boolean;
  setQuickCreateButtonLoading: (loading: boolean) => void;
  setFetchLinksLoader: (loading: boolean) => void;
  setShortUrlButtonLoading: (loading: boolean) => void;
  setQrCodeButtonLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  quickCreateButtonLoading: false,
  fetchLinksLoader: false,
  qrCodeButtonLoading: false,
  shortUrlButtonLoading: false,
  setQuickCreateButtonLoading: (loading: boolean) =>
    set({ quickCreateButtonLoading: loading }),
  setFetchLinksLoader: (loading: boolean) => set({ fetchLinksLoader: loading }),
  setShortUrlButtonLoading: (loading: boolean) => set({ shortUrlButtonLoading: loading }),
  setQrCodeButtonLoading: (loading: boolean) =>
    set({ qrCodeButtonLoading: loading }),
}));

export default useLoadingStore;
