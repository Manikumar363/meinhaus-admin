import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Button from "../common/Button";
import {
  HandCoins,
  Bell,
  CircleX,
  CheckCircle2,
  EllipsisVertical,
} from "lucide-react";
import InitiatePaymentModal from "./InitiatePaymentModal";
import NotifyModal from "./NotifyModal";
import MarkPaidModal from "./MarkPaidModal";
import MarkUnpaidModal from "./MarkUnpaidModal";

export default function InvoiceActions({ invoice }) {
  const [openModal, setOpenModal] = useState(null);

  const handleClick = (action) => {
    setOpenModal(action);
  };

  const closeModal = () => setOpenModal(null);

  return (
    <>
      <Popover>
        <PopoverTrigger
          asChild
          className="rounded-full bg-zinc-400 cursor-pointer"
        >
          <EllipsisVertical size={16} className="text-slate-600" />
        </PopoverTrigger>
        <PopoverContent className="bg-white w-fit flex flex-col gap-1 p-1 text-xs lg:text-sm">
          <Button
            title={
              invoice.status === "Not Initiated" ? "Initiate Payment" : "Notify"
            }
            Icon={invoice.status === "Not Initiated" ? HandCoins : Bell}
            className={
              invoice.status === "Not Initiated"
                ? "text-orange-600"
                : "text-yellow-600"
            }
            onClick={() =>
              handleClick(
                invoice.status === "Not Initiated" ? "initiate" : "notify"
              )
            }
          />
          <div className="border border-slate-200 mx-2" />
          <Button
            title={
              invoice.status === "Completed" ? "Mark as Unpaid" : "Mark as Paid"
            }
            Icon={invoice.status === "Completed" ? CircleX : CheckCircle2}
            className={
              invoice.status === "Completed" ? "text-red-600" : "text-lime-600"
            }
            onClick={() =>
              handleClick(invoice.status === "Completed" ? "unpaid" : "paid")
            }
          />
        </PopoverContent>
      </Popover>

      {/* Modals */}
      {openModal === "initiate" && (
        <InitiatePaymentModal
          open={true}
          onOpenChange={closeModal}
          invoice={invoice}
        />
      )}
      {openModal === "notify" && (
        <NotifyModal open={true} onOpenChange={closeModal} invoice={invoice} />
      )}
      {openModal === "paid" && (
        <MarkPaidModal
          open={true}
          onOpenChange={closeModal}
          invoice={invoice}
        />
      )}
      {openModal === "unpaid" && (
        <MarkUnpaidModal
          open={true}
          onOpenChange={closeModal}
          invoice={invoice}
        />
      )}
    </>
  );
}
