import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "../../ui/button";

const BookingDetailsHeader = ({ booking }) => {
  return (
    <div className="flex max-lg:flex-col lg:items-center mb-6 justify-between gap-2">
      <div className="flex gap-1">
        <Link to="/bookings">
          <ArrowLeft size={16} className="mr-4 cursor-pointer" />
        </Link>
        <span className="text-sm lg:text-lg font-semibold">
          Bookings / {booking.title}
        </span>
      </div>
      <div className="flex gap-2 justify-end">
        <Button size="sm" className="bg-orange-400 text-white text-xs lg:text-sm">
          Price Feedback
        </Button>
        <Button size="sm" className="bg-blue-500 text-white text-xs lg:text-sm">
          Request Info
        </Button>
      </div>
    </div>
  );
};

export default BookingDetailsHeader;
