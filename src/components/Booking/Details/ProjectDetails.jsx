import React from "react";
import DetailsRow from "../DetailsRow";
import { CalendarDays, Mail, MapPin, Phone, Wrench } from "lucide-react";

const ProjectDetails = ({ booking }) => {
  return (
    <div className="flex-1 flex flex-col gap-1 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-t-xl">
        <p className="font-semibold text-sm lg:text-lg">Project Details</p>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h2 className="font-medium text-black text-xs lg:text-sm">
              {booking.customer.name}
            </h2>
            <p className="font-semibold text-slate-400 text-[10px] lg:text-xs">
              Shared By: <span className="text-orange-500">Professional</span>{" "}
            </p>
          </div>
          <img
            src={booking.customer.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm bg-white p-4 rounded-b-xl">
        <DetailsRow title="Project Title" data={booking.title} Icon={Wrench} />
        <DetailsRow
          title="Mobile Number"
          data={booking.customer.phone}
          Icon={Phone}
        />
        <DetailsRow
          title="Customer Name"
          data={booking.customer.name}
          image={booking.customer.avatar}
        />
        <DetailsRow
          title="Created At"
          data={booking.createdAt}
          Icon={CalendarDays}
        />
        <DetailsRow
          title="Email ID"
          data={booking.customer.email}
          Icon={Mail}
        />
        <DetailsRow title="Address" data={booking.address} Icon={MapPin} />
      </div>
    </div>
  );
};

export default ProjectDetails;
