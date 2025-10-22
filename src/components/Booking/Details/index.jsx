import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { bookingsData } from "../../../constants/index.js";
import ProjectDetails from "./ProjectDetails.jsx";
import ProjectDescription from "./ProjectDescription.jsx";
import ProjectDetailsTabs from "./Tabs/index.jsx";
import BookingDetailsHeader from "./BookingDetailsHeader.jsx";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const foundBooking = bookingsData.find((b) => b.id === id);
    setBooking(foundBooking);
  }, [id]);

  if (!booking) return <p className="text-center mt-10">Booking not found</p>;

  return (
    <div className="h-full">
      <BookingDetailsHeader booking={booking} />
      <div className="flex gap-6 max-lg:flex-col">
        <ProjectDetails booking={booking} />
        <ProjectDescription booking={booking} />
      </div>
      <ProjectDetailsTabs booking={booking} />
    </div>
  );
};

export default BookingDetailsPage;
