import { create } from "zustand";

interface NavigationState {
  sidebarMenu: string;
  quickCreate: string;
  shortUrlNavigation: string;
  qrCodeNavigation: string;
  setSidebarMenu: (menu: string) => void;
  setQuickCreate: (menu: string) => void;
  setShortUrlNavigation: (menu: string) => void;
  setQrCodeNavigation: (menu: string) => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  sidebarMenu: "home",
  quickCreate: "short-url",
  shortUrlNavigation: "short-url",
  qrCodeNavigation: "qr-code",
  setSidebarMenu: (menu: string) => set({ sidebarMenu: menu }),
  setQuickCreate: (menu: string) => set({ quickCreate: menu }),
  setShortUrlNavigation: (menu: string) => set({ shortUrlNavigation: menu }),
  setQrCodeNavigation: (menu: string) => set({ qrCodeNavigation: menu }),
}));

export default useNavigationStore;
