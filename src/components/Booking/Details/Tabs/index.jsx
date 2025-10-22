import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ConvertToEstimateTab from "./ConvertToEstimate";
import { cn } from "@/lib/utils";
import { projectDetailsTabs } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectDetailsTabs = ({ booking }) => {
  const [activeTab, setActiveTab] = useState(projectDetailsTabs[0].id);

  return (
    <ScrollArea className="w-full py-4 text-xs lg:text-md">
      <div className="flex border-b border-gray-200 w-full py-8">
        {projectDetailsTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-none flex items-center gap-2 flex-1 text-[10px] lg:text-sm",
              activeTab === tab.id
                ? "border-b-2 border-black text-black"
                : "text-slate-400"
            )}
          >
            {tab.label}
            {tab.count && (
              <span className="bg-gray-300 px-2 py-0.5 rounded-full text-[10px] lg:text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="py-4 lg:px-4">
        {activeTab === "convert" && <ConvertToEstimateTab booking={booking} />}
        {activeTab === "price" && (
          <Button variant="default">Convert this booking to estimate</Button>
        )}
        {activeTab === "info" && (
          <p className="text-sm text-muted-foreground">
            Here you can request additional information for this project.
          </p>
        )}
      </div>
    </ScrollArea>
  );
};

export default ProjectDetailsTabs;
