import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import useFormStore from "./useFormStore";
import useNavigationStore from "./useNavigationStore";
import useLoadingStore from "./useLoadingStore";

interface Link {
  _id: string;
  title: string;
  originalUrl: string;
  shortUrl?: string;
  qrCodeLink?: string;
  type: "qr-code" | "short-url";
  clicks: number;
  createdAt: string;
}

interface LinkState {
  links: Link[];
  previewLink: Link | null;
  urlLimit: number;
  qrLimit: number;
  handleQuickCreateSubmit: () => void;
  handleUrlSubmit: () => void;
  handleQrSubmit: () => void;
  fetchLinks: () => void;
  updateTitle: (id: string, title: string) => void;
  deleteLink: (id: string) => Promise<number>;
  getLimit: () => void;
}

const useLinkStore = create<LinkState>((set, get) => ({
  links: [],
  urlLimit: 0,
  qrLimit: 0,
  previewLink: null,

  // ➕ Create Short URL and QR Code
  handleQuickCreateSubmit: async () => {
    try {
      if (useNavigationStore.getState().quickCreate === "link") {
        useLoadingStore.getState().setQuickCreateButtonLoading(true);
        const { quickCreateInput } = useFormStore.getState();
        if (!quickCreateInput) {
          toast.error("Please enter a valid URL");
          return;
        }
        const res = await axiosInstance.post("/api/v2/link/short", {
          originalUrl: quickCreateInput,
          title: "",
        });
        set({ previewLink: res.data.result });
        set({ links: [res.data.result, ...get().links] });
        useLoadingStore.getState().setQuickCreateButtonLoading(false);
        toast.success("Short URL created successfully");
      } else {
        useLoadingStore.getState().setQuickCreateButtonLoading(true);
        const { quickCreateInput } = useFormStore.getState();
        if (!quickCreateInput) {
          toast.error("Please enter a valid URL");
          return;
        }
        const res = await axiosInstance.post("/api/v2/link/qr", {
          originalUrl: quickCreateInput,
        });
        set({ previewLink: res.data.result });
        set({ links: [res.data.result, ...get().links] });
        useLoadingStore.getState().setQuickCreateButtonLoading(false);
        toast.success("QR Code generated successfully");
      }
    } catch (err: any) {
      console.error("Error creating short URL or QR code:", err);
      toast.error(
        err?.response?.data?.msg ||
          "Failed to create short URL or limit reached"
      );
      throw err;
    } finally {
      useLoadingStore.getState().setQuickCreateButtonLoading(false);
    }
  },

  // ➕ Create URL
  handleUrlSubmit: async () => {
    try {
      const { urlsInputs } = useFormStore.getState();
      if (!urlsInputs.title || !urlsInputs.url || !urlsInputs.password) {
        toast.error("Please fill in all fields");
        return;
      }
      useLoadingStore.getState().setUrlButtonLoading(true);
      const res = await axiosInstance.post("/api/v2/link/short", {
        originalUrl: urlsInputs.url,
        title: urlsInputs.title,
        password: urlsInputs.password || undefined,
      });
      set({ previewLink: res.data.result });
      set({ links: [res.data.result, ...get().links] });
      useNavigationStore.getState().setUrlsNavigation("link");
      useFormStore.getState().resetUrlsInputs();
      useLoadingStore.getState().setUrlButtonLoading(false);
      toast.success("Short URL created successfully");
    } catch (err: any) {
      console.error("Error creating short URL:", err);
      toast.error(err?.response?.data?.msg || "Failed to create short URL");
    }
  },

  // ➕ Create QR Code
  handleQrSubmit: async () => {
    try {
      const { qrInputs } = useFormStore.getState();
      if (!qrInputs.url || !qrInputs.title) {
        toast.error("Please enter a valid URL and title");
        return;
      }
      useLoadingStore.getState().setQrCreateButtonLoading(true);
      const res = await axiosInstance.post("/api/v2/link/qr", {
        originalUrl: qrInputs.url,
        title: qrInputs.title,
      });
      set({ previewLink: res.data.result });
      set({ links: [res.data.result, ...get().links] });
      useNavigationStore.getState().setQrNavigation("qr");
      useFormStore.getState().resetQrInputs();
      useLoadingStore.getState().setQrCreateButtonLoading(false);
      toast.success("QR Code generated successfully");
    } catch (err: any) {
      console.error("Error creating QR code:", err);
      toast.error(err?.response?.data?.msg || "Failed to create QR code");
    } finally {
      useLoadingStore.getState().setQrCreateButtonLoading(false);
    }
  },

  // 📥 Fetch all user links
  fetchLinks: async () => {
    try {
      useLoadingStore.getState().setFetchLinksLoader(true);
      const res = await axiosInstance.get("/api/v2/link");
      set({ links: res.data.links });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed to load links");
    } finally {
      useLoadingStore.getState().setFetchLinksLoader(false);
    }
  },

  // ✏️ Update link title
  updateTitle: async (id, title) => {
    try {
      const res = await axiosInstance.put(`/api/v2/link/${id}`, { title });
      const updated = res.data.url;
      set({
        links: get().links.map((link) => (link._id === id ? updated : link)),
      });
      toast.success("Title updated");
      return 1;
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed to update title");
      return 0;
    }
  },

  // 🗑️ Delete link
  deleteLink: async (id) => {
    try {
      await axiosInstance.delete(`/api/v2/link/${id}`);
      set({ links: get().links.filter((link) => link._id !== id) });
      toast.success("Deleted successfully");
      return 1;
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed to delete link");
      return 0;
    }
  },

  // 🔢 Get URL and QR code limit
  getLimit: async () => {
    try {
      const res = await axiosInstance.get("/api/v2/link/limit");
      set({ urlLimit: res.data.urls, qrLimit: res.data.qrCodes });
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Failed to get limits");
    }
  },
}));

export default useLinkStore;
