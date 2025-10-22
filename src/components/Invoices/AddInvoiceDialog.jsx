import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DollarSign, Plus } from "lucide-react";
import Button from "../common/Button";

export default function AddInvoiceDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAddInvoice = () => {
    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Create New"
          Icon={Plus}
          className="bg-black text-white hover:bg-black/80 text-xs px-4 py-2"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Add Invoice</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="flex gap-2 border rounded-md items-center px-2 focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1">
                <DollarSign size={16} className="text-slate-400" />
                <Input
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Write details about the nature of invoice..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Cancel"
                className="bg-gray-100 px-4 py-2 text-xs"
                onClick={() => setOpen(false)}
              />
              <Button
                title="Add Invoice"
                className="bg-black text-white px-4 py-2 text-xs"
                onClick={handleAddInvoice}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
