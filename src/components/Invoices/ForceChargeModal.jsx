import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import Button from "../common/Button";
import { useState } from "react";

const ForceChargeModal = ({ open, onOpenChange }) => {
  const [error, setError] = useState(false);
  const handleConfirm = () => {
    setError(true);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">
            Force Charge Confirmation
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">
                Amount:
                <span className="text-blue-400 ml-2">$1000</span>
              </h2>
              <ul className="list-disc ml-4 text-sm">
                <li>All the remaining amount will be charged.</li>
                <li>
                  The amount will be automatically deducted from customer's
                  default card.
                </li>
                <li>
                  An e-mail will be sent to customer notifying them about the
                  charged payment.
                </li>
                <li>Are you sure you want to proceed?</li>
              </ul>
            </div>
            {error && (
              <div className="bg-orange-100 rounded-md p-2">
                <h2 className="font-medium text-sm">Error:</h2>
                <ul className="list-disc ml-4 text-sm">
                  <li>
                    This invoice can't be force charged as the customer hasn't
                    yet paid any amount on this invoice or doesn't have a valid
                    stripe customer id.
                  </li>
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                title="Cancel"
                className="bg-gray-100 px-4 py-2 text-xs"
                onClick={onOpenChange}
              />
              <Button
                disabled={!!error}
                title="Confirm"
                className={`px-4 py-2 text-xs ${
                  error
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
                onClick={handleConfirm}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ForceChargeModal;
