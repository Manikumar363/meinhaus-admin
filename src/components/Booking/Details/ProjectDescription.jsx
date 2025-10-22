import React from "react";

const ProjectDescription = ({ booking }) => {
  return (
    <div className="flex-1 flex flex-col gap-1 h-full">
      <div className="flex justify-between bg-white p-4 rounded-t-xl">
        <div className="font-semibold mb-2 text-sm lg:text-lg">Project Description & Images</div>
        <div className="flex items-center">
          <img
            src={booking.customer.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border"
          />
          <img
            src={booking.customer.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border -ml-2"
          />
          <img
            src={booking.customer.avatar}
            alt="avatar"
            className="w-7 h-7 rounded-full border -ml-2"
          />
          <span className="text-xs text-gray-500">4+</span>
        </div>
      </div>
      <div className="bg-white rounded-b-xl p-4 h-full">
        <div className="text-gray-400 text-xs lg:text-sm font-medium pt-4">
          My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not
          Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are
          Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is
          Damaged And All Taps Are Broken, Shower Is Not Working Properly. My
          Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not
          Working Properly.{" "}
          <span className="text-blue-400 font-semibold cursor-pointer">
            Readmore...
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
