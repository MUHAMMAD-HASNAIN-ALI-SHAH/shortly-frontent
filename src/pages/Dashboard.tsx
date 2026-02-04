import Navbar from "../components/Dashboard/Navbar";
import { AppSidebar } from "../components/Dashboard/sidebar/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import Profile from "../components/Dashboard/Profile";
import Home from "../components/Dashboard/Home";
import Link from "../components/Dashboard/ShortUrl";
import QrCode from "../components/Dashboard/QrCode";
import useNavigationStore from "../store/useNavigationStore";
import useLimitStore from "../store/useLimitStore";
import { useEffect } from "react";
import useShortUrlStore from "../store/useShortUrlStore";
import useQrCodeStore from "../store/useQrCodeStore";

const Dashboard = () => {
  const { sidebarMenu } = useNavigationStore();
    const { getShortUrls } = useShortUrlStore();
  const { getQrCodes } = useQrCodeStore();

  const { getLimit } = useLimitStore();

  useEffect(() => {
    getLimit();
  }, [getLimit]);

  useEffect(() => {
    getQrCodes();
  }, [getQrCodes]);

  useEffect(() => {
    getShortUrls();
  }, [getShortUrls]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Navbar />
          <div className="w-full h-[calc(100vh-64px)] overflow-y-auto p-4 overflow-x-hidden">
            {sidebarMenu === "home" && <Home />}
            {sidebarMenu === "short-url" && <Link />}
            {sidebarMenu === "qr-code" && <QrCode />}
            {sidebarMenu === "profile" && <Profile />}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
