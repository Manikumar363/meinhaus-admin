import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const CreateNewTab = ({ onScrollTo }) => {
  const [activeTab, setActiveTab] = useState("customer");

  const handleClick = (tab) => {
    setActiveTab(tab);
    onScrollTo(tab);
  };

  return (
    <div className="bg-white h-24 flex lg:flex-col rounded-lg w-full lg:w-44 font-medium text-xs lg:text-sm">
      <div
        onClick={() => handleClick("customer")}
        className={cn(
          "text-center py-2 flex-1 cursor-pointer",
          activeTab == "project" && "text-slate-400"
        )}
      >
        Customer Details
      </div>
      <Separator className="border hidden lg:inline" />
      <Separator orientation="vertical" className="border lg:hidden inline" />
      <div
        onClick={() => handleClick("project")}
        className={cn(
          "text-center py-2 flex-1 cursor-pointer",
          activeTab == "customer" && "text-slate-400"
        )}
      >
        Project Details
      </div>
    </div>
  );
};

export default CreateNewTab;
