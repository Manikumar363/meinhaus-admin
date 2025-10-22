import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Copy, Edit, EllipsisVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function DraftEstimateActions({ invoice }) {
  const [openModal, setOpenModal] = useState(null);

  const handleClick = (action) => {
    setOpenModal(action);
  };

  const closeModal = () => setOpenModal(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="rounded-full bg-zinc-400 cursor-pointer w-fit p-0.5">
            <EllipsisVertical size={16} className="text-slate-500" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-white w-fit flex flex-col gap-1 p-1 text-xs lg:text-sm">
          <div className="flex flex-col">
            <Button className="text-sky-500 shadow-none border-b-2 flex justify-start">
              <Edit />
              Edit
            </Button>
            <Button className="text-zinc-500 shadow-none border-b-2 flex justify-start">
              <Copy />
              Copy
            </Button>
            <Button className="text-red-500 shadow-none flex justify-start">
              <Trash />
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
