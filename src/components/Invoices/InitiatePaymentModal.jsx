import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import Button from "../common/Button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DollarSign } from "lucide-react";

const InitiatePaymentModal = ({ open, onOpenChange, invoice }) => {
  const [amountPaid, setAmountPaid] = useState("");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const totalAmount = Number(invoice?.amount.slice(1)) || 0;
    const paid = Number(amountPaid);

    if (!isNaN(paid) && paid >= 0) {
      const newRemaining = Math.max(totalAmount - paid, 0);
      setRemaining(newRemaining.toFixed(2));
    } else {
      setRemaining(totalAmount.toFixed(2));
    }
  }, [amountPaid, invoice?.amount]);

  const handleConfirm = () => {};
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">
            Initiate Amount Confirmation
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="space-y-2 font-bold">
              <h2 className="text-lg">
                Amount:
                <span className="text-blue-400 ml-2">{invoice.amount}</span>
              </h2>
            </div>
            <p>
              An email will be sent to the customer prompting them to pay the
              invoice amount. Are you sure you want to proceed?
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="space-y-2 flex-1">
                  <Label>Initial Amount</Label>
                  <div className="flex gap-2 border rounded-md items-center px-2 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1">
                    <DollarSign size={16} className="text-slate-400" />
                    <Input
                      placeholder="1000"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Remaining Amount</Label>
                  <div className="flex gap-2 border rounded-md items-center px-2 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1">
                    <DollarSign size={16} className="text-slate-400" />
                    <Input
                      value={remaining}
                      readOnly
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 rounded-md p-2">
              <h2 className="font-medium text-sm">NOTE:</h2>
              <ul className="list-disc ml-4 text-xs">
                <li>
                  If you want to initiate a partial payment, you can enter the
                  desired amount in the <strong>"Initiate Amount"</strong> input
                  field.
                </li>
                <li>
                  The remaining balance will be automatically included in the
                  next invoice.
                </li>
              </ul>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                title="Cancel"
                className="bg-gray-100 px-4 py-2 text-xs"
                onClick={onOpenChange}
              />
              <Button
                title="Confirm"
                className="bg-black text-white px-4 py-2 text-xs"
                onClick={handleConfirm}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InitiatePaymentModal;
