import React, { useState } from "react";
import AddSalesExecutiveModal from "./AddSalesExecutiveModal";
import BookingDetails from "./EstimateDetails";
import EditEstimate from "./EditEstimate";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  dotsIcon as DotsIcon,
} from "../ui/icons";
import { estimatesData, tabs } from "../../constants";

const AllEstimates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showEditEstimate, setShowEditEstimate] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddSalesExecutive = (executive) => {
    console.log("Adding sales executive:", executive);
    // Add your logic here to assign the sales executive
  };

  const handleViewBookingDetails = (estimate) => {
    setSelectedEstimate(estimate);
    setShowBookingDetails(true);
  };

  const handleBackFromBookingDetails = () => {
    setShowBookingDetails(false);
    setSelectedEstimate(null);
  };

  const handleEditEstimate = (estimate) => {
    setSelectedEstimate(estimate);
    setShowEditEstimate(true);
  };

  const handleBackFromEditEstimate = () => {
    setShowEditEstimate(false);
    setSelectedEstimate(null);
  };

  // Dummy data for estimates

  // Show booking details if selected
  if (showBookingDetails && selectedEstimate) {
    return <BookingDetails onBack={handleBackFromBookingDetails} />;
  }

  // Show edit estimate if selected
  if (showEditEstimate && selectedEstimate) {
    return (
      <EditEstimate
        onBack={handleBackFromEditEstimate}
        estimate={selectedEstimate}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-1">
      <div className="max-w-7xl mx-auto">
        <div className="text-xl font-bold mb-4">All Estimates</div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-2 items-center justify-end">
          <div className="relative w-[420px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9D9D9D]">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by Project title, Customer name, Address"
              className="w-full border rounded-md pl-10 pr-2 py-3 bg-[#E9E9E9] text-[#9D9D9D] text-base"
            />
          </div>
          <select className="border rounded-md px-4 py-3 bg-[#E9E9E9] text-[#9D9D9D] text-base w-[220px]">
            <option>Select Service Name</option>
            <option>Appliance Install</option>
            <option>Home Painting</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-700 text-sm border-b">
                <th className="px-3 py-2 font-semibold">S.No.</th>
                <th className="px-3 py-2 font-semibold">Title</th>
                <th className="px-3 py-2 font-semibold">Customer</th>
                <th className="px-3 py-2 font-semibold">Address</th>
                <th className="px-3 py-2 font-semibold">Price</th>
                <th className="px-3 py-2 font-semibold">Services</th>
                <th className="px-3 py-2 font-semibold">Assign Status</th>
                <th className="px-3 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {estimatesData.map((estimate, idx) => (
                <tr key={estimate.id} className="border-b text-sm">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium w-fit ${estimate.statusColor}`}
                      >
                        {estimate.status}
                      </span>
                      <span className="font-semibold text-orange-600">
                        {estimate.jobId}
                      </span>
                      <span className="font-semibold">{estimate.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={estimate.customer.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border"
                      />
                      <div>
                        <div className="font-medium">
                          {estimate.customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {estimate.customer.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {estimate.address}
                  </td>
                  <td className="px-3 py-2 font-semibold">{estimate.price}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{estimate.services}</span>
                      <span className="text-xs text-blue-600">
                        {estimate.moreServices} ▸
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="font-medium">{estimate.assignStatus}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        title="View"
                        onClick={() => handleViewBookingDetails(estimate)}
                      >
                        <EyeIcon />
                      </button>
                      <div className="relative">
                        <button
                          className="text-gray-400 hover:text-black"
                          title="Menu"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === estimate.id
                                ? null
                                : estimate.id
                            )
                          }
                        >
                          <DotsIcon />
                        </button>
                        {openDropdownId === estimate.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 w-full text-sm text-left"
                              onClick={() => {
                                handleEditEstimate(estimate);
                                setOpenDropdownId(null);
                              }}
                            >
                              <EditIcon />
                              Edit
                            </button>
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm text-left"
                              onClick={() => setOpenDropdownId(null)}
                            >
                              <DeleteIcon />
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                handleOpenModal();
                                setOpenDropdownId(null);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-sm text-left"
                            >
                              <AddIcon />
                              Add Sales Executive
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2 text-gray-600">
            <span>Previous</span>
            <button className="w-7 h-7 rounded bg-blue-100 text-blue-700 font-bold">
              1
            </button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">2</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">3</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">4</button>
            <button className="w-7 h-7 rounded hover:bg-blue-100">5</button>
            <span>Next</span>
          </div>
        </div>
      </div>

      {/* Add Sales Executive Modal */}
      <AddSalesExecutiveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddSalesExecutive}
      />
    </div>
  );
};

export default AllEstimates;
