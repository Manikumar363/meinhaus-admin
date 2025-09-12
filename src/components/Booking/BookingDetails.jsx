import React from "react";

const BookingDetails = ({ booking, onClose }) => {
  if (!booking) return null;
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onClose} className="mr-4 text-2xl">←</button>
        <span className="text-lg font-medium">Bookings / {booking.title}</span>
        <div className="ml-auto flex gap-2">
          <button className="bg-orange-400 text-white px-4 py-2 rounded font-medium">Price Feedback</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded font-medium">Request Info</button>
        </div>
      </div>
          {/* Project Details */}
          <div className="flex gap-6 mb-6">
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Project Details</span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium text-black">Jayme Savage</span>
                  <span className="bg-gray-200 px-2 py-0.5 rounded">Shared By: Professional</span>
                  <img src={booking.customer.avatar} alt="avatar" className="w-7 h-7 rounded-full border ml-2" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mt-2">
                <div className="flex items-center gap-2"><span className="font-medium">Project Title</span>: {booking.title}</div>
                <div className="flex items-center gap-2"><span className="font-medium">Mobile Number</span>: {booking.customer.phone}</div>
                <div className="flex items-center gap-2"><span className="font-medium">Customer Name</span>: {booking.customer.name}</div>
                <div className="flex items-center gap-2"><span className="font-medium">Created At</span>: {booking.createdAt}</div>
                <div className="flex items-center gap-2"><span className="font-medium">Email ID</span>: {booking.customer.email}</div>
                <div className="flex items-center gap-2"><span className="font-medium">Address</span>: Highway 407, Vaughan, Ontario, Canada, M6A 2T9</div>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="font-semibold mb-2">Project Description & Images</div>
              <div className="flex items-center gap-2 mb-2">
                <img src={booking.customer.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />
                <img src={booking.customer.avatar} alt="avatar" className="w-7 h-7 rounded-full border" />
                <span className="text-xs text-gray-500">2+</span>
              </div>
              <div className="text-gray-700 text-sm">
                My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. <span className="text-blue-600 cursor-pointer">Readmore...</span>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-6 border-b mb-4">
            <button className="px-4 py-2 font-medium border-b-2 border-black">Convert to Estimate</button>
            <button className="px-4 py-2 font-medium text-gray-400">Price Feedback <span className="ml-1 bg-gray-200 rounded px-2">3</span></button>
            <button className="px-4 py-2 font-medium text-gray-400">Request Info <span className="ml-1 bg-gray-200 rounded px-2">2</span></button>
          </div>
          {/* Convert to Estimate Form */}
          <div className="bg-white rounded-lg p-4 mb-4 border">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input type="text" value={booking.title} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
              </div>
              <div>
                <label className="block text-sm mb-1">Province</label>
                <input type="text" placeholder="Enter Province" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Postal/Zip Code</label>
                <input type="text" placeholder="Enter Postal/Zip Code" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Contact Number (will be used for estimate)</label>
                <input type="text" placeholder="Enter Contact Number" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Number of Payment</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" className="accent-black" />
                <span>Auto Divide</span>
              </div>
            </div>
          </div>
          {/* Service Details (repeatable) */}
          {[1,2].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 mb-4 border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Service Details</span>
                {i === 1 && <button className="text-red-500 font-medium">Remove</button>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Service Name</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option>Select Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Amount</label>
                  <input type="text" placeholder="Enter Amount" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Registration Amount</label>
                  <input type="text" placeholder="Enter Registration Amount" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <input type="text" placeholder="Enter Description" className="w-full border rounded px-3 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Professional Description</label>
                  <textarea className="w-full border rounded px-3 py-2" placeholder="Enter Professional Description"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm mb-1">Images</label>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={booking.customer.avatar} alt="preview" className="w-16 h-16 object-cover rounded border" />
                    <img src={booking.customer.avatar} alt="preview" className="w-16 h-16 object-cover rounded border" />
                    <label className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
                      <span className="text-sm text-gray-500">Choose Images</span>
                      <input type="file" multiple className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="border px-4 py-2 rounded font-medium mb-4">+ Add Service</button>
          <div className="flex justify-end gap-4">
            <button className="bg-black text-white px-8 py-2 rounded font-medium">Convert to estimate</button>
            <button className="border px-8 py-2 rounded font-medium">Hourly Booking</button>
          </div>

    </div>
  );
};

export default BookingDetails;
