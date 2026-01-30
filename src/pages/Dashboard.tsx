import { useEffect } from "react";
import Navbar from "../components/Dashboard/Navbar";
import { AppSidebar } from "../components/Dashboard/sidebar/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import Profile from "../components/Dashboard/Profile";
import Home from "../components/Dashboard/Home";
import Link from "../components/Dashboard/Link";
import QrCode from "../components/Dashboard/QrCode";
import useLinkStore from "../store/useLinkStore";
import useNavigationStore from "../store/useNavigationStore";
import useLimitStore from "../store/useLimitStore";

const Dashboard = () => {
  const { fetchLinks } = useLinkStore();
  const { getLimit } = useLimitStore();
  const { sidebarMenu } = useNavigationStore();

  useEffect(() => {
    getLimit();
    fetchLinks();
  }, [getLimit, fetchLinks]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Navbar />
          <div className="w-full h-[calc(100vh-64px)] overflow-y-auto p-4 overflow-x-hidden">
            {sidebarMenu === "Home" && <Home />}
            {sidebarMenu === "Urls" && <Link />}
            {sidebarMenu === "QR Codes" && <QrCode />}
            {sidebarMenu === "Profile" && <Profile />}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
