import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import BookingForm from "./BookingForm";
import CreateNewTab from "./Tabs/Index";
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateBooking = () => {
  const customerRef = useRef(null);
  const projectRef = useRef(null);

  const handleScrollTo = (section) => {
    if (section === "customer" && customerRef.current) {
      customerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (section === "project" && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 items-center">
        <Link to="/bookings">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-semibold text-sm lg:text-lg">Create New Booking</h1>
      </div>

      <div className="flex max-lg:flex-col gap-8 h-full">
        <CreateNewTab onScrollTo={handleScrollTo} />
        <ScrollArea className="flex-1">
          <BookingForm customerRef={customerRef} projectRef={projectRef} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CreateBooking;
