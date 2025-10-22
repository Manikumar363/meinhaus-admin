import { Download } from "lucide-react";
import { useParams } from "react-router";
import Button from "../common/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { invoiceData } from "../../constants";
import AddInvoiceDialog from "./AddInvoiceDialog";
import { cn } from "../../lib/utils";
import InvoiceActions from "./InvoiceActions";
import { useState } from "react";
import ForceChargeModal from "./ForceChargeModal";

const Invoices = () => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline">
        <h1 className="text-lg font-semibold">Invoice/#{id}</h1>
        <div className="flex gap-2">
          <Button
            title="Download as PDF"
            Icon={Download}
            className="bg-lime-500 hover:bg-lime-600 text-white text-xs px-4 py-2"
          />
          <AddInvoiceDialog />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between bg-white rounded-t-xl p-4">
          <div className="flex gap-8">
            <div>
              <h2 className="text-lg font-bold">Home Renovation</h2>
              <p className="text-slate-500 text-xs">Title</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">#{id}</h2>
              <p className="text-slate-500 text-xs">Booking ID</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-sky-500">$3500</h2>
            <p className="text-slate-500 text-xs">Total Amount</p>
          </div>
        </div>
        <div className="bg-white p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Sr No
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Invoice Amount
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Description
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Payment Status
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Payment Method
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Date Generated
                </TableHead>
                <TableHead className="font-bold text-xs lg:text-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="font-medium text-[10px] lg:text-xs lg:text-sm">
              {invoiceData.map((invoice) => (
                <TableRow key={invoice.srNo}>
                  <TableCell>{invoice.srNo}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-md",
                        invoice.status === "Completed" &&
                          "bg-green-100 text-green-700",
                        invoice.status === "Pending" &&
                          "bg-orange-100 text-orange-700",
                        invoice.status === "Not Initiated" &&
                          "bg-red-100 text-red-700"
                      )}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <InvoiceActions {...{ invoice }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white p-4 rounded-b-xl">
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white w-fit px-4 py-2 text-xs"
            title="Force Charge"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      {openModal && (
        <ForceChargeModal
          open={openModal}
          onOpenChange={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Invoices;
