import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";

import { ChevronDown, EllipsisVertical } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { draftEstimates } from "../../constants";
import DraftEstimateActions from "./DraftEstimateActions";

export default function DraftEstimateTable() {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
      <div className="overflow-x-auto w-full">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Sr No
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Draft Name
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Customer
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Email ID
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Project Title
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm cursor-pointer select-none hover:text-primary transition whitespace-nowrap">
                <div className="flex gap-1 items-center">
                  <p>Last Edited</p>
                  <ChevronDown size={16} />
                </div>
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm cursor-pointer select-none hover:text-primary transition whitespace-nowrap w-[100px]">
                <div className="flex gap-1 items-center">
                  <p>Created At</p>
                  <ChevronDown size={16} />
                </div>
              </TableHead>
              <TableHead className="font-bold text-xs lg:text-sm whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="font-medium text-[10px] lg:text-xs lg:text-sm">
            {draftEstimates.length > 0 ? (
              draftEstimates.map((draft) => (
                <TableRow
                  key={draft.srNo}
                  className="hover:bg-gray-50 transition-colors text-xs"
                >
                  <TableCell>{draft.srNo}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {draft.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{draft.customer.name}</p>
                      <p className="text-slate-400">
                        {draft.customer.phoneNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {draft.emailId}
                  </TableCell>
                  <TableCell>{draft.projectTitle}</TableCell>
                  <TableCell>{draft.lastEdited}</TableCell>
                  <TableCell>{draft.createdAt}</TableCell>
                  <TableCell>
                    <DraftEstimateActions />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No draft estimates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4 border-t pt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
