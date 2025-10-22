import React, { useState } from "react";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  dotsIcon as DotIcon,
  PaymentIcon,
  UploadIcon,
} from "../ui/icons";
import PaidDetails from "./PaidDetails";
import { Link, useNavigate } from "react-router";
import { servicesData } from "../../constants";

const EstimateDetails = ({ onBack }) => {
  const [isViewLogsOpen, setIsViewLogsOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [isPendingPaymentOpen, setIsPendingPaymentOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [isDeleteServiceOpen, setIsDeleteServiceOpen] = useState(false);
  const [showPaidJobDetails, setShowPaidJobDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-1">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-600">Bookings / </span>
          <span className="text-black font-medium">Home Painting</span>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-gray-500">Email Tracker</span>
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setIsViewLogsOpen(true)}
            >
              <EyeIcon className="text-blue-500" />
              <span className="text-blue-500 font-medium">View</span>
            </div>
            <div className="relative">
              <div
                className="w-8 h-8 cursor-pointer flex items-center justify-center"
                onClick={() => setIsHeaderDropdownOpen(!isHeaderDropdownOpen)}
              >
                <DotIcon />
              </div>
              {isHeaderDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 w-full text-sm text-left"
                    onClick={() => {
                      setIsEditServiceOpen(true);
                      setIsHeaderDropdownOpen(false);
                    }}
                  >
                    <EditIcon />
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Details */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold">Project Details</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Jayme Savage</span>
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JS</span>
                  </div>
                  <span className="text-xs text-gray-400">Shared By: </span>
                  <span className="text-xs text-orange-500 font-medium">
                    Professional
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Project Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Project Title
                      </div>
                      <div className="font-semibold text-gray-900">
                        Home Painting
                      </div>
                    </div>
                  </div>

                  {/* Booking ID */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Booking ID
                      </div>
                      <div className="font-semibold text-gray-900">
                        #HAL2GK765
                      </div>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="James Robert"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Customer Name
                      </div>
                      <div className="font-semibold text-gray-900">
                        James Robert
                      </div>
                    </div>
                  </div>

                  {/* Email ID */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Email ID</div>
                      <div className="font-semibold text-gray-900">
                        jamesrobert@gmail.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Total Project Cost */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Total Project Cost
                      </div>
                      <div className="font-semibold text-gray-900">$5423</div>
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Mobile Number
                      </div>
                      <div className="font-semibold text-gray-900">
                        +11209876543
                      </div>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Created At
                      </div>
                      <div className="font-semibold text-gray-900">
                        03 July 2025, 20:56
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Address</div>
                      <div className="font-semibold text-gray-900">
                        3401 Dufferin Street, Wimbledon, Toronto, Vaughan,
                        Canada, M6A 2T9
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Estimate via Email
                </button>
                <button className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Estimate via SMS
                </button>
              </div>
            </div>
          </div>

          {/* Project Description & Images */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">
                Project Description & Images
              </h2>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center"
                    alt="Bathroom renovation project 1"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center"
                    alt="Bathroom renovation project 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-400 font-medium ml-1">
                  2+
                </span>
              </div>
            </div>

            <div className="text-gray-500 text-sm leading-relaxed mb-6">
              My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is
              Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps
              Are Broken, Shower Is Not Working Properly.My Bathroom Pipeline Is
              Damaged And All Taps Are Broken, Shower Is Not Working Properly.
              My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is
              Not Working Properly.My Bathroom Pipeline Is Damaged And All Taps
              Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline
              Is Damaged And All Taps Are Broken, Shower Is Not Working
              Properly.My Bathroom Pipeline Is Damaged And All Taps Are Broken,
              Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged
              And All Taps Are Broken, Shower Is Not Working Properly.My
              Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is
              Not Working Properly.
              <span className="text-blue-500 cursor-pointer font-medium">
                {" "}
                Readmore...
              </span>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="text-sm text-gray-400 mb-3">
                Generated Link will appear here
              </div>
              <button className="bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Get Link
              </button>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Services (2)</h2>
            <button
              className="bg-gray-800 text-white py-2 px-4 rounded-lg font-medium"
              onClick={() => setIsAddServiceOpen(true)}
            >
              + Add Services
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-gray-700 text-sm border-b">
                  <th className="px-3 py-3 font-semibold">S.No.</th>
                  <th className="px-3 py-3 font-semibold">Service Name</th>
                  <th className="px-3 py-3 font-semibold">Reg. Amount</th>
                  <th className="px-3 py-3 font-semibold">Total Cost</th>
                  <th className="px-3 py-3 font-semibold">Payment Status</th>
                  <th className="px-3 py-3 font-semibold">Job Assign Status</th>
                  <th className="px-3 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {servicesData.map((service, idx) => (
                  <tr key={service.id} className="border-b text-sm">
                    <td className="px-3 py-4">{idx + 1}</td>
                    <td className="px-3 py-4 font-medium">
                      {service.serviceName}
                    </td>
                    <td className="px-3 py-4">{service.regAmount}</td>
                    <td className="px-3 py-4 font-semibold">
                      {service.totalCost}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${service.paymentStatusColor}`}
                      >
                        {service.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${service.jobAssignStatusColor}`}
                      >
                        {service.jobAssignStatus}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-yellow-500 hover:text-yellow-600"
                          title="View"
                          onClick={() =>
                            navigate(`/paid-details/${service.id}`)
                          }
                        >
                          <EyeIcon />
                        </button>
                        <Link to={`/invoices/${service.id}`}
                          className="text-blue-500 hover:text-blue-600"
                          title="Payment"
                        >
                          <PaymentIcon />
                        </Link>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More options"
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === service.id
                                  ? null
                                  : service.id
                              )
                            }
                          >
                            <DotIcon />
                          </button>
                          {openDropdownId === service.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 w-full text-sm text-left"
                                onClick={() => {
                                  setIsEditServiceOpen(true);
                                  setOpenDropdownId(null);
                                }}
                              >
                                <EditIcon />
                                Edit
                              </button>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm text-left"
                                onClick={() => {
                                  setIsDeleteServiceOpen(true);
                                  setOpenDropdownId(null);
                                }}
                              >
                                <DeleteIcon />
                                Delete
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
          </div>
        </div>
      </div>

      {/* View Logs Modal */}

      {/* Show Paid Job Details as full page if triggered */}
      {showPaidJobDetails && (
        <PaidDetails onBack={() => setShowPaidJobDetails(false)} />
      )}
      {/* ...existing code... */}
      {isViewLogsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">View Logs</h2>
              <button
                onClick={() => setIsViewLogsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                (The Timestamps here show everytime the user viewed the relevant
                information. The System records only those attempts that occur
                at least 30 minutes apart)
              </p>

              {/* Logs Table */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        S.No.
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Viewing Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-gray-900">1</td>
                      <td className="py-4 px-6 text-gray-900">
                        28 August, 2025 at 11:45:05
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Payment Modal */}
      {isPendingPaymentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b relative">
              <div className="w-full text-center">
                <h2 className="text-xl font-semibold">Pending Payment</h2>
              </div>
              <button
                onClick={() => setIsPendingPaymentOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                The customer hasn't paid registration amount yet and the service
                is still just requested. Do you still want to assign a
                professional?
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPendingPaymentOpen(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Go to Invoice
                </button>
                <button
                  onClick={() => setIsPendingPaymentOpen(false)}
                  className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b relative">
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-2">Add New Service</h2>
                <p className="text-gray-500 text-sm">
                  (The service will be added to overall project, giving you the
                  freedom to assign new professional to it.)
                </p>
              </div>
              <button
                onClick={() => setIsAddServiceOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 appearance-none">
                      <option>Select Service</option>
                      <option>Appliance Install</option>
                      <option>Appliance Repair</option>
                      <option>Flooring and Tile Services</option>
                      <option>Home Painting</option>
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                  />
                </div>

                {/* Registration Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Registration Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter Description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Professional Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Description
                  </label>
                  <textarea
                    placeholder="Enter Professional Description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images
                  </label>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12">
                      <img
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center"
                        alt="Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        ×
                      </button>
                    </div>
                    <div className="relative w-12 h-12">
                      <img
                        src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center"
                        alt="Service 3"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        ×
                      </button>
                    </div>
                  </div>
                  <button className="border border-[#262626] font-semibold rounded-lg px-2 py-2 text-[#262626] flex items-center gap-2 hover:bg-gray-50">
                    <UploadIcon className="w-5 h-5" />
                    Upload Images
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsAddServiceOpen(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddServiceOpen(false)}
                  className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Details Modal */}
      {isEditServiceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b relative">
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Edit Service Details
                </h2>

                {/* NOTE Section */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    NOTE:
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • Please modify the amount-related information{" "}
                      <span className="text-orange-600 font-medium">
                        only if the user has not yet paid for the project.
                      </span>
                    </li>
                    <li>
                      • You can change the amount whether the registration fee
                      is paid or not.
                    </li>
                    <li>
                      • Adjust the registration amount{" "}
                      <span className="text-orange-600 font-medium">
                        only if it has not been paid already.
                      </span>
                    </li>
                    <li>
                      •{" "}
                      <span className="text-orange-600 font-medium">
                        Do not alter the amount
                      </span>{" "}
                      if it has already been fully or partially paid.
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setIsEditServiceOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 appearance-none">
                      <option>Select Service</option>
                      <option>Appliance Install</option>
                      <option>Appliance Repair</option>
                      <option>Flooring and Tile Services</option>
                      <option>Home Painting</option>
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                  />
                </div>

                {/* Registration Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Registration Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter Description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Professional Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Description
                  </label>
                  <textarea
                    placeholder="Enter Professional Description"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images
                  </label>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12">
                      <img
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center"
                        alt="Service 1"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        ×
                      </button>
                    </div>
                    <div className="relative w-12 h-12">
                      <img
                        src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center"
                        alt="Service 2"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        ×
                      </button>
                    </div>
                    <div className="relative w-12 h-12">
                      <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center"
                        alt="Service 3"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                        ×
                      </button>
                    </div>
                  </div>
                  <button className="border border-[#262626] font-semibold rounded-lg px-2 py-2 text-[#262626] flex items-center gap-2 hover:bg-gray-50">
                    <UploadIcon className="w-5 h-5" />
                    Upload Images
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsEditServiceOpen(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditServiceOpen(false)}
                  className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Service Confirmation Modal */}
      {isDeleteServiceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-2">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b relative">
              <div className="w-full text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="64"
                    height="60"
                    viewBox="0 0 64 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.7553 0.131902C42.6177 -1.25045 48.789 8.53567 54.5393 15.3001C59.6099 21.265 64.1152 27.9394 63.9977 35.7083C63.8817 43.3794 59.994 50.68 53.931 55.5191C48.378 59.9512 40.9095 59.6842 33.7553 59.8459C26.3393 60.0134 18.6145 60.7551 12.6292 56.4522C5.77318 51.5234 -1.21799 43.9381 0.179994 35.7083C1.54044 27.6994 13.0487 26.8506 18.6692 20.8951C24.7873 14.4123 24.8656 1.51849 33.7553 0.131902Z"
                      fill="#F32E2E"
                      fill-opacity="0.12"
                    />
                    <path
                      d="M32.322 25.4283H37.6791C37.6791 24.7179 37.3969 24.0366 36.8946 23.5343C36.3923 23.0319 35.711 22.7497 35.0006 22.7497C34.2902 22.7497 33.6089 23.0319 33.1065 23.5343C32.6042 24.0366 32.322 24.7179 32.322 25.4283ZM30.7148 25.4283C30.7148 24.2917 31.1664 23.2016 31.9701 22.3978C32.7738 21.5941 33.8639 21.1426 35.0006 21.1426C36.1372 21.1426 37.2273 21.5941 38.031 22.3978C38.8347 23.2016 39.2863 24.2917 39.2863 25.4283H45.9827C46.1958 25.4283 46.4002 25.513 46.5509 25.6637C46.7016 25.8144 46.7863 26.0187 46.7863 26.2319C46.7863 26.445 46.7016 26.6494 46.5509 26.8001C46.4002 26.9508 46.1958 27.0354 45.9827 27.0354H44.5791L43.2752 42.6815C43.1803 43.8197 42.6612 44.8807 41.8207 45.6541C40.9803 46.4275 39.8799 46.8568 38.7377 46.8569H31.2634C30.1213 46.8568 29.0209 46.4275 28.1804 45.6541C27.3399 44.8807 26.8208 43.8197 26.7259 42.6815L25.422 27.0354H24.0184C23.8053 27.0354 23.6009 26.9508 23.4502 26.8001C23.2995 26.6494 23.2148 26.445 23.2148 26.2319C23.2148 26.0187 23.2995 25.8144 23.4502 25.6637C23.6009 25.513 23.8053 25.4283 24.0184 25.4283H30.7148ZM28.3277 42.5476C28.389 43.2841 28.7248 43.9707 29.2686 44.4712C29.8123 44.9717 30.5244 45.2496 31.2634 45.2497H38.7377C39.4768 45.2496 40.1888 44.9717 40.7325 44.4712C41.2763 43.9707 41.6121 43.2841 41.6734 42.5476L42.9677 27.0354H27.0345L28.3277 42.5476ZM32.5898 30.7854C32.803 30.7854 33.0074 30.8701 33.1581 31.0208C33.3088 31.1715 33.3934 31.3759 33.3934 31.589V40.6962C33.3934 40.9093 33.3088 41.1137 33.1581 41.2644C33.0074 41.4151 32.803 41.4997 32.5898 41.4997C32.3767 41.4997 32.1723 41.4151 32.0216 41.2644C31.8709 41.1137 31.7863 40.9093 31.7863 40.6962V31.589C31.7863 31.3759 31.8709 31.1715 32.0216 31.0208C32.1723 30.8701 32.3767 30.7854 32.5898 30.7854ZM38.2148 31.589C38.2148 31.3759 38.1302 31.1715 37.9795 31.0208C37.8288 30.8701 37.6244 30.7854 37.4113 30.7854C37.1982 30.7854 36.9938 30.8701 36.8431 31.0208C36.6924 31.1715 36.6077 31.3759 36.6077 31.589V40.6962C36.6077 40.9093 36.6924 41.1137 36.8431 41.2644C36.9938 41.4151 37.1982 41.4997 37.4113 41.4997C37.6244 41.4997 37.8288 41.4151 37.9795 41.2644C38.1302 41.1137 38.2148 40.9093 38.2148 40.6962V31.589Z"
                      fill="#F32E2E"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Are You Sure You Want to Delete this Service?
                </h2>
              </div>
              <button
                onClick={() => setIsDeleteServiceOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              ></button>
            </div>

            {/* Modal Content */}
            <div className="p-2 text-center">
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Deleting this service will permanently remove its data. Are you
                sure you want to proceed?
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteServiceOpen(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add your delete logic here
                    console.log("Service deleted");
                    setIsDeleteServiceOpen(false);
                  }}
                  className="flex-1 bg-gray-800 text-white py-2 px-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateDetails;
