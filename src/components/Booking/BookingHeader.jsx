import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";

const BookingHeader = ({ bookingsData, search, setSearch }) => {
  return (
    <div className="flex w-full mb-4 flex-col gap-2">
      <div className="flex justify-between items-center w-full gap-4">
        <h2 className="text-sm lg:text-xl font-semibold">
          Bookings ({bookingsData.length})
        </h2>
        <div className="flex gap-4">
          <div className="hidden lg:flex items-center border rounded-md px-2 gap-1 bg-gray-200">
            <Search size={16} />
            <div className="border h-5 border-gray-400" />
            <Input
              placeholder="Search by Project title, Customer name, Address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none shadow-none focus-visible:outline-none focus-visible:ring-0 text-sm"
            />
          </div>

          <Link to="/bookings/new">
            <Button
              size="sm"
              className="flex items-center gap-1 bg-black text-white cursor-pointer text-xs"
            >
              <Plus size={16} />
              Create Booking
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-lg:flex lg:hidden items-center border rounded-md px-2 gap-1 bg-gray-200 max-w-md">
        <Search size={16} />
        <div className="border h-5 border-gray-400" />
        <Input
          placeholder="Search by Project title, Customer name, Address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none focus-visible:outline-none focus-visible:ring-0 text-sm"
        />
      </div>
    </div>
  );
};

export default BookingHeader;
