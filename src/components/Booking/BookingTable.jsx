import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, EllipsisVertical, Eye, Trash } from "lucide-react";
import { Link } from "react-router";

const BookingTable = ({ filteredBookings, selected, setSelected }) => {
  const isAllSelected =
    selected.length === filteredBookings.length && filteredBookings.length > 0;
    
  const handleSelectAll = (checked) => {
    setSelected(checked ? filteredBookings.map((b) => b.id) : []);
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    alert(`Deleting bookings: ${selected.join(", ")}`);
    handleDeselectAll();
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  return (
    <div className="rounded-lg overflow-x-auto bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-4 py-3">
              <div className="flex items-center gap-2 justify-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className="border-2 border-black"
                />
                {selected.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-xs">
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={handleBulkDelete}>
                        Delete Selected
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-slate-400"
                        onClick={handleDeselectAll}
                      >
                        Deselect All
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </TableHead>

            <TableHead className="px-4 py-3">Title</TableHead>
            <TableHead className="px-4 py-3">Customer</TableHead>
            <TableHead className="px-4 py-3">Address</TableHead>
            <TableHead className="px-4 py-3">Time</TableHead>
            <TableHead className="px-4 py-3">Created At</TableHead>
            <TableHead className="px-4 py-3">Status</TableHead>
            <TableHead className="px-4 py-3">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-xs">
          {filteredBookings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-gray-400 text-base"
              >
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            filteredBookings.map((b) => (
              <TableRow
                key={b.id}
                className={`hover:bg-gray-50 border-b transition-colors duration-150 ${
                  b.status === "Not Viewed" ? "bg-yellow-50" : ""
                }`}
              >
                <TableCell className="text-center px-4 py-3">
                  <Checkbox
                    checked={selected.includes(b.id)}
                    onCheckedChange={() => handleSelect(b.id)}
                    className="border-2 border-black"
                    aria-label={`Select booking ${b.title}`}
                  />
                </TableCell>

                <TableCell className="px-4 py-3 space-y-1">
                  {b.fromShare && (
                    <span className="inline-block text-xs bg-yellow-200 text-yellow-800 rounded px-2 py-0.5 mr-1">
                      From Share
                    </span>
                  )}
                  <div className="font-medium">{b.title}</div>
                  <div className="text-xs text-gray-400">
                    {b.customer.email}
                  </div>
                </TableCell>

                <TableCell className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={b.customer.avatar}
                      alt="avatar"
                      className="w-7 h-7 rounded-full border"
                    />
                    <div>
                      <div className="font-medium">{b.customer.name}</div>
                      <div className="text-xs text-gray-400">
                        {b.customer.phone}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3">{b.address}</TableCell>
                <TableCell className="px-4 py-3">{b.time}</TableCell>
                <TableCell className="px-4 py-3">{b.createdAt}</TableCell>

                <TableCell className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.status === "Not Viewed"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/bookings/details/${b.id}`}
                      title="View Booking Details"
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Eye size={16} />
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-gray-200 rounded-full p-1">
                        <EllipsisVertical size={12} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => alert("Deleted booking " + b.id)}
                        >
                          <Trash size={16} className="text-red-600" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
