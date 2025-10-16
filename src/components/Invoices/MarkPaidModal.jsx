import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Button from "../common/Button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

const MarkPaidModal = ({ open, onOpenChange, invoice }) => {
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

  const handleMarkAsPaid = () => {
    onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Mark As Paid</DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">
                Amount:
                <span className="text-blue-400 ml-2">{invoice.amount}</span>
              </h2>
              <p>
                This invoice item (Amount Paid) will be marked as paid. Are you
                sure you want to proceed?
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="space-y-2 flex-1">
                  <Label>Amount Paid</Label>
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
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Choose Payment Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="klarna">Klarna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Checkbox className="data-[state=checked]:bg-lime-600 data-[state=checked]:text-white" />

                <span>Include in Transaction</span>
              </div>
              <p className="py-2 px-4">
                (Selecting this option will include this item in transaction
                data, which is essential for tracking{" "}
                <span className="text-orange-400">total revenue</span>. If this
                transaction has not yet been accounted for and you wish to add
                this amount to the revenue, please ensure this box is checked.)
              </p>
            </div>
            <div className="bg-orange-100 rounded-md p-2">
              <h2 className="font-medium text-sm">NOTE:</h2>
              <ul className="list-disc ml-4 text-xs">
                <li>
                  If the customer made a partial payment, you can enter that
                  amount in the <strong>'Amount Paid'</strong> input field.
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
                title="Mark as Paid"
                className="bg-lime-600 text-white px-4 py-2 text-xs"
                onClick={handleMarkAsPaid}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MarkPaidModal;
