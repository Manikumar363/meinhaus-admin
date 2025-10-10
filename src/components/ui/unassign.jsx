
import React from "react";
import { UnassignIcon } from "./icons";

const Unassign = ({ professionalName, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl w-[400px] max-w-full p-8 relative animate-fadeIn">
      <button
        className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="flex flex-col items-center mb-6">

          {/* SVG icon for user with minus */}
          <UnassignIcon />
        <div className="text-2xl font-bold mb-2">Unassign Job</div>
        <div className="text-gray-500 text-center mb-6">Are you sure you want to unassign this job from<br/>{professionalName}</div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-3 text-md font-semibold" onClick={onClose}>Cancel</button>
        <button className="flex-1 bg-black text-white rounded-xl py-3 text-md font-semibold">Unassign</button>
      </div>
    </div>
  );
};

export default Unassign;
