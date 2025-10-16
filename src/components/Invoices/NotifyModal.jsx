import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import Button from "../common/Button";

const NotifyModal = ({ open, onOpenChange, invoice }) => {
  const handleNotification = () => {
    onOpenChange();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Confirmation</DialogTitle>
          <DialogDescription className="space-y-4 text-center">
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
            <div className="flex justify-center gap-2">
              <Button
                title="Cancel"
                className="bg-gray-100 px-4 py-2 text-xs"
                onClick={onOpenChange}
              />
              <Button
                title="Confirm"
                className="bg-black text-white px-4 py-2 text-xs"
                onClick={handleNotification}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyModal;
