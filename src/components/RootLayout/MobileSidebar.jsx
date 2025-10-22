"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const MobileSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) =>
    setOpenDropdown(openDropdown === label ? null : label);
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu size={16} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-black text-white h-full flex-col transition-all flex w-72 p-4 py-8 border-none"
      >
        <SheetHeader>
          <SheetTitle>
            <NavLink
              to="/"
              className="border-b border-slate-700 flex items-center justify-start transition-all"
            >
              <img
                src="/assets/images/main-logo.png"
                alt="Logo"
                className="object-contain transition-all w-60"
              />
            </NavLink>
          </SheetTitle>
        </SheetHeader>
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
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5" />

                    <span className="inline">{link.label}</span>
                  </div>
                  {hasChildren &&
                    (openDropdown === link.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </NavLink>

                {hasChildren && openDropdown === link.label && (
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

                        <span className="inline">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
