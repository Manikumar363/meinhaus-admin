import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import Button from "../common/Button";
import { Checkbox } from "../ui/checkbox";

const MarkUnpaidModal = ({ open, onOpenChange, invoice }) => {
  const handleMarkAsUnpaid = () => {
    onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Mark As Unpaid</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="space-y-2 font-bold">
              <h2 className="text-lg">
                Amount:
                <span className="text-blue-400 ml-2">{invoice.amount}</span>
              </h2>
            </div>
            <p>
              This invoice item will be marked as unpaid. Are you sure you want
              to proceed?
            </p>
            <div>
              <div className="flex gap-2">
                <Checkbox className="data-[state=checked]:bg-lime-600 data-[state=checked]:text-white" />

                <span>Remove from Transaction(if available)</span>
              </div>
              <p className="py-2 px-4">
                (Selecting this option will remove this item in transaction
                data, which is essential for tracking{" "}
                <span className="text-orange-400">total revenue</span>. If this
                transaction has already been accounted for and you wish to
                remove this amount from the revenue, please ensure this box is
                checked.)
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                title="Cancel"
                className="bg-gray-100 px-4 py-2 text-xs"
                onClick={onOpenChange}
              />
              <Button
                title="Mark as Unpaid"
                className="bg-red-500 text-white px-4 py-2 text-xs"
                onClick={handleMarkAsUnpaid}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MarkUnpaidModal;
