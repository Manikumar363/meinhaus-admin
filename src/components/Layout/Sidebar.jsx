import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className="w-fit bg-black text-white h-full flex flex-col">
      {/* Logo (Large screen) */}
      <Link
        to="/"
        className="p-6 border-b border-slate-700 flex items-center justify-center max-lg:hidden"
      >
        <img src="/main-logo.png" alt="Logo" className="w-64 object-contain" />
      </Link>

      {/* Logo (Small screen) */}
      <Link
        to="/"
        className="p-2 border-b border-slate-700 flex items-center justify-start lg:hidden"
      >
        <img
          src="/short-logo.png"
          alt="Logo"
          className="w-16 h-12 object-contain"
        />
      </Link>

      {/* Sidebar Links */}
      <nav className="flex-1 mt-2 overflow-auto px-3">
        <div></div>
        {sidebarLinks.map((link) => {
          const isParentActive =
            location.pathname === link.path ||
            link.children?.some((child) => location.pathname === child.path);

          return (
            <div key={link.label} className="mb-1">
              <Link
                to={link.path}
                onClick={() =>
                  link.children
                    ? toggleDropdown(link.label)
                    : setOpenDropdown(null)
                }
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                  isParentActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800",
                  link.label === "Create Estimate" &&
                    "bg-sky-400/20 hover:bg-sky-400/30 text-sky-400"
                )}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span className="hidden lg:inline">{link.label}</span>
                </div>
                {link.children &&
                  (openDropdown === link.label ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  ))}
              </Link>

              {/* Dropdown Items */}
              {link.children && openDropdown === link.label && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {link.children.map((child) => {
                    const isActive = location.pathname === child.path;
                    return (
                      <Link
                        to={child.path}
                        key={child.label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {child.icon}
                        <span className="hidden lg:inline">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
