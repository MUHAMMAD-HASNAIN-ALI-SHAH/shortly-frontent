import useAuthStore from "../../store/useAuthStore";
import { SidebarTrigger } from "../ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full shadow-md bg-white h-16 z-50">
      <nav className="w-full flex items-center justify-between px-4 py-5">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="cursor-pointer"></SidebarTrigger>
          <h1 className="font-bold text-xl cursor-pointer">Shortly</h1>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center space-x-4">
              <h1 className="text-md md:text-lg font-semibold">
                Hi{" "}
                {user?.username
                  ? user.username.length > 12
                    ? user.username.slice(0, 12) + "..."
                    : user.username
                  : ""}
              </h1>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                <p className="text-sm">{user?.username?.charAt(0) ?? "U"}</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg shadow-lg p-4 mr-2">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                <p className="text-sm">{user?.username?.charAt(0) ?? "U"}</p>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  {user?.username
                    ? user.username.length > 15
                      ? user.username.slice(0, 15) + "..."
                      : user.username
                    : ""}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.email
                    ? user.email.length > 22
                      ? user.email.slice(0, 22) + "..."
                      : user.email
                    : ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => useAuthStore.getState().logout()}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
};

export default Navbar;
