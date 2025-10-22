import { Search } from "lucide-react";
import { Input } from "../ui/input";
import DraftEstimateTable from "./DraftEstimateTable";

const DraftEstimateSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          Draft Estimates<span>(33)</span>
        </h1>
        <div className="flex items-center border px-4 rounded-md bg-zinc-200">
          <Search size={16} />
          <div className="border border-zinc-500 h-4 ml-2" />
          <Input
            placeholder="Search by Project title, Customer name, Address"
            className="outline-none focus-visible:ring-0 rounded-none text-sm"
          />
        </div>
      </div>
      <DraftEstimateTable />
    </div>
  );
};

export default DraftEstimateSection;
