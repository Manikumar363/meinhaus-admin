import { NavLink } from "react-router";
import { sidebarLinks } from "../../constants";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ openSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) =>
    setOpenDropdown(openDropdown === label ? null : label);

  return (
    <aside className="bg-black text-white h-full flex-col transition-all hidden lg:flex p-4">
      <NavLink
        to="/"
        className={cn(
          "border-b border-slate-700 flex items-center justify-center transition-all py-4",
          openSidebar ? "max-lg:hidden" : "p-2"
        )}
      >
        <img
          src={
            openSidebar
              ? "/assets/images/main-logo.png"
              : "/assets/images/short-logo.png"
          }
          alt="Logo"
          className={cn(
            "object-contain transition-all",
            openSidebar ? "w-64" : "w-12 h-12"
          )}
        />
      </NavLink>

      <nav className="flex-1 mt-2 overflow-auto px-1">
        {sidebarLinks.map((link) => {
          const hasChildren = link.children && link.children.length > 0;

          return (
            <div key={link.label} className="mb-1">
              <NavLink
                to={link.path}
                end={!hasChildren}
                title={link.label}
                onClick={() => hasChildren && toggleDropdown(link.label)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-2 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800",
                    link.label === "Create Estimate" &&
                      "bg-sky-400/20 hover:bg-sky-400/30 text-sky-400"
                  )
                }
              >
                <div className="flex items-center justify-center gap-3">
                  <link.icon className="w-5 h-5" />
                  {openSidebar && (
                    <span className="hidden lg:inline">{link.label}</span>
                  )}
                </div>
                {hasChildren &&
                  openSidebar &&
                  (openDropdown === link.label ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  ))}
              </NavLink>

              {hasChildren && openSidebar && openDropdown === link.label && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  {link.children.map((child) => (
                    <NavLink
                      to={child.path}
                      key={child.label}
                      end
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        )
                      }
                    >
                      <child.icon className="w-4 h-4" />
                      {openSidebar && (
                        <span className="hidden lg:inline">{child.label}</span>
                      )}
                    </NavLink>
                  ))}
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
