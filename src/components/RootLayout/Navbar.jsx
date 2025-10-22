import { navLinks } from "../../constants";
import LogoutButton from "../LogoutButton";
import { Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import MobileSidebar from "./MobileSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = ({ setOpenSidebar }) => {
  const adminAccess = useSelector((state) => state.auth.accessToken);
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 shrink-0 px-4 lg:px-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Button
            className="text-gray-600 hover:text-gray-900 bg-transparent hover:bg-transparent cursor-pointer hidden lg:flex"
            onClick={() => setOpenSidebar((prev) => !prev)}
          >
            <Menu size={16} />
          </Button>
          <MobileSidebar />
          <h1 className="text-sm lg:text-xl font-semibold text-gray-900">
            Admin Panel
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {navLinks.map((item) => (
            <div className="relative" key={item.name}>
              <item.icon className="h-4 w-4 lg:w-5 lg:h-5" />
              <span className="absolute -top-3 -right-1 bg-red-500 text-white text-[8px] lg:text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                10
              </span>
            </div>
          ))}

          {adminAccess ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <LogoutButton className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size={"sm"}
              className={"bg-white text-black border hover:bg-gray-50"}
            >
              <Link to="/auth/signin">SignIn</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
