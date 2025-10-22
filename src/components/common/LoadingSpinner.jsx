import React from "react";
import { HashLoader, ClipLoader, BeatLoader } from "react-spinners";

import { TableRow, TableCell } from "../ui/table";

// Whole page loading spinner
const PageLoadingSpinner = ({ isFullPage = false }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-10 h-screen ${
        !isFullPage ? "lg:left-[16rem]" : ""
      }`}
    >
      <HashLoader color="#ffffff" size={60} />
    </div>
  );
};

// Small loading spinner
const LoadingSpinner = ({ size = 25, color = "#ffffff" }) => {
  return (
    <ClipLoader
      size={size}
      color={color}
      cssOverride={{ borderWidth: "0.2rem" }}
    />
  );
};

// Table loader row
const TableLoader = ({ colSpan = 1 }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="flex justify-center items-center py-4">
          <LoadingSpinner color="var(--softpurple)" size={50} />
        </div>
      </TableCell>
    </TableRow>
  );
};

// Upload spinner
const UploadSpinner = () => <BeatLoader color="#f1f1f1" />;

export { PageLoadingSpinner, LoadingSpinner, UploadSpinner, TableLoader };