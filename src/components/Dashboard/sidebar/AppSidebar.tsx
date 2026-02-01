import { Home, Link, ScanLine, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../../ui/sidebar";
import useNavigationStore from "../../../store/useNavigationStore";

export function AppSidebar() {
  const { sidebarMenu, setSidebarMenu } = useNavigationStore();
  return (
    <Sidebar className="">
      <SidebarHeader className="px-4 py-5 border-b">
        <h2 className="text-lg font-bold">Shortly</h2>
        <p className="text-sm text-gray-500">Welcome back!</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <ul className="space-y-2">
            <li
              onClick={() => setSidebarMenu("home")}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold ${
                sidebarMenu === "home"
                  ? "text-blue-600 pl-3 border-l-4 border-blue-600"
                  : ""
              }`}
            >
              <Home
                className={`${
                  sidebarMenu === "Home" ? "text-blue-600" : "text-gray-600"
                } inline-block mr-2`}
              />
              Home
            </li>
            <li
              onClick={() => setSidebarMenu("short-url")}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold ${
                sidebarMenu === "short-url"
                  ? "text-blue-600 pl-3 border-l-4 border-blue-600"
                  : ""
              }`}
            >
              <Link
                className={`${
                  sidebarMenu === "Urls" ? "text-blue-600" : "text-gray-600"
                } inline-block mr-2`}
              />
              Urls
            </li>
            <li
              onClick={() => setSidebarMenu("qr-code")}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold ${
                sidebarMenu === "qr-code"
                  ? "text-blue-600 pl-3 border-l-4 border-blue-600"
                  : ""
              }`}
            >
              <ScanLine
                className={`${
                  sidebarMenu === "qr-code" ? "text-blue-600" : "text-gray-600"
                } inline-block mr-2`}
              />
              QR Codes
            </li>
            <li
              onClick={() => setSidebarMenu("profile")}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold ${
                sidebarMenu === "profile"
                  ? "text-blue-600 pl-3 border-l-4 border-blue-600"
                  : ""
              }`}
            >
              <User
                className={`${
                  sidebarMenu === "profile" ? "text-blue-600" : "text-gray-600"
                } inline-block mr-2`}
              />
              Profile
            </li>
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-500">
          © 2025 Shortly. All rights reserved.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
