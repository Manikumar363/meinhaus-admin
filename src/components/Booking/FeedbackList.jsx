import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>{item.requests}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.created}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedbackList;
