import { create } from "zustand";

interface NavigationState {
  sidebarMenu: string;
  quickCreate: string;
  urlsNavigation: string;
  qrNavigation: string;
  setSidebarMenu: (menu: string) => void;
  setQuickCreate: (menu: string) => void;
  setUrlsNavigation: (menu: string) => void;
  setQrNavigation: (menu: string) => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  sidebarMenu: "Home",
  quickCreate: "link",
  urlsNavigation: "link",
  qrNavigation: "qr",
  setSidebarMenu: (menu: string) => set({ sidebarMenu: menu }),
  setQuickCreate: (menu: string) => set({ quickCreate: menu }),
  setUrlsNavigation: (menu: string) => set({ urlsNavigation: menu }),
  setQrNavigation: (menu: string) => set({ qrNavigation: menu }),
}));

export default useNavigationStore;
