import { create } from "zustand";

interface LoadingState {
  quickCreateButtonLoading: boolean;
  fetchLinksLoader: boolean;
  urlButtonLoading: boolean;
  qrButtonLoading: boolean;
  setQuickCreateButtonLoading: (loading: boolean) => void;
  setFetchLinksLoader: (loading: boolean) => void;
  setUrlButtonLoading: (loading: boolean) => void;
  setQrCreateButtonLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  quickCreateButtonLoading: false,
  fetchLinksLoader: false,
  qrButtonLoading: false,
  urlButtonLoading: false,
  setQuickCreateButtonLoading: (loading: boolean) =>
    set({ quickCreateButtonLoading: loading }),
  setFetchLinksLoader: (loading: boolean) => set({ fetchLinksLoader: loading }),
  setUrlButtonLoading: (loading: boolean) => set({ urlButtonLoading: loading }),
  setQrCreateButtonLoading: (loading: boolean) =>
    set({ qrButtonLoading: loading }),
}));

export default useLoadingStore;
