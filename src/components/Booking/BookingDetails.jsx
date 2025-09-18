import React from "react";
// import { calenderIcon, phoneIcon, settingsIcon, mailIcon,locationIcon } from "../ui/icons";

const dummyFeedback = [
  { id: 1, service: "Flooring and Tile Services", requests: "-", amount: "-", created: "28 July, 2025 at 16:49:37", status: "Not Sent" },
  { id: 2, service: "Flooring and Tile Services", requests: "-", amount: "$5500", created: "28 July, 2025 at 16:49:37", status: "Not Sent" },
  { id: 3, service: "Flooring and Tile Services", requests: "-", amount: "$5500", created: "28 July, 2025 at 16:49:37", status: "Sent" },
];

const BookingDetails = ({ booking, onClose }) => {
  const [editId, setEditId] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("estimate");
  const [showHourly, setShowHourly] = React.useState(false);
  const [showPriceModal, setShowPriceModal] = React.useState(false);
  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState("");
  const [priceForms, setPriceForms] = React.useState([
    { service: '', description: '', images: [1,2,3] }
  ]);
  if (!booking) return null;
  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Edit Price Feedback Modal */}
      {editId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-lg relative">
            <button className="absolute top-4 right-4 text-2xl" onClick={() => setEditId(null)}>&times;</button>
            <div className="text-2xl font-bold mb-6">Edit Price Feedback</div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Service Name</label>
              <select className="w-full border rounded px-4 py-3 bg-gray-100 text-lg" disabled>
                <option>Appliance Instal</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Description</label>
              <textarea className="w-full border rounded px-4 py-3 bg-gray-100 text-lg" rows={3} disabled>My Bathroom pipeline is damaged...</textarea>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Images</label>
              <div className="flex gap-4">
                {[1,2,3].map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={`https://images.unsplash.com/photo-${img}?w=100`} alt="img" className="w-20 h-20 object-cover rounded-lg border" />
                    <span className="absolute top-2 left-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                      {idx === 0 ? (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button className="border px-8 py-2 rounded font-bold text-lg">Save</button>
              <button className="bg-black text-white px-8 py-2 rounded font-bold text-lg">Save and Send</button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onClose} className="mr-4 text-2xl">←</button>
        <span className="text-lg font-medium">Bookings / {booking.title}</span>
        <div className="ml-auto flex gap-2">
          <button className="bg-orange-400 text-white px-5 py-2 rounded-lg font-semibold text-base shadow-sm" onClick={() => setShowPriceModal(true)}>Price Feedback</button>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-base shadow-sm" onClick={() => setShowRequestModal(true)}>Request Info</button>
      {/* Request Info Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white rounded-2xl p-8 w-[600px] shadow-lg relative">
            <button className="absolute top-6 right-6 text-2xl text-gray-700" onClick={() => setShowRequestModal(false)}>&times;</button>
            <div className="text-2xl font-semibold mb-6">Request Info</div>
            <form className="w-full" onSubmit={e => { e.preventDefault(); setShowRequestModal(false); }}>
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full border rounded-xl px-6 py-4 bg-gray-50 text-md placeholder-gray-400 font-sm"
                  placeholder="Type your message here..."
                  value={requestMessage}
                  onChange={e => setRequestMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-black text-white px-7 py-3 rounded-xl font-semibold text-base flex items-center gap-2">
                  Send
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      {/* Price Feedback Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className={`bg-white rounded-2xl p-8 shadow-lg relative ${priceForms.length === 1 ? 'w-[600px]' : 'w-[1100px]'} text-gray-900`}> 
            <button className={`absolute ${priceForms.length === 1 ? 'top-6 right-6' : 'top-6 right-8'} text-3xl text-gray-700`} onClick={() => setShowPriceModal(false)}>&times;</button>
            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">Price Feedback</div>
              <button className="border px-5 py-2 rounded-xl font-semibold text-base shadow-sm" onClick={() => setPriceForms([...priceForms, { service: '', description: '', images: [1,2,3] }])}>+ Add Another Form</button>
            </div>
            <form>
              <div className={priceForms.length === 1 ? "grid grid-cols-1 gap-8" : "grid grid-cols-2 gap-8 text-base"}>
                {priceForms.map((form, idx) => (
                  <div key={idx} className="relative bg-transparent">
                    {priceForms.length > 1 && (
                      <button type="button" className="absolute top-0 right-0 text-red-500 font-medium" onClick={() => setPriceForms(priceForms.filter((_, i) => i !== idx))}>Remove</button>
                    )}
                    <div className="mb-4">
                      <label className="block text-base font-bold mb-2 text-gray-900 tracking-tight">Service Name</label>
                      <select className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base font-semibold">
                        <option>Select Service</option>
                        <option>Flooring and Tile Services</option>
                        <option>Appliance Install</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-base font-bold mb-2 text-gray-900 tracking-tight">Description</label>
                      <textarea className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base font-semibold" rows={3} placeholder="Enter Description"></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-base font-bold mb-2 text-gray-900 tracking-tight">Images</label>
                      <div className="flex gap-4">
                        {[1,2,3].map((img, imgIdx) => (
                          <div key={imgIdx} className="relative">
                            <img src={`https://images.unsplash.com/photo-${img}?w=100`} alt="img" className="w-20 h-20 object-cover rounded-lg border" />
                            <span className="absolute top-2 left-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                              {imgIdx === 0 ? (
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                              ) : (
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" className="border px-8 py-2 rounded-xl font-bold text-base tracking-tight" onClick={() => setShowPriceModal(false)}>Save</button>
                <button type="button" className="bg-black text-white px-8 py-2 rounded-xl font-bold text-base tracking-tight">Save and Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
            <button
              className={`px-4 py-2 font-medium ${activeTab === "estimate" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
              onClick={() => setActiveTab("estimate")}
            >
              Convert to Estimate
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "price" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
              onClick={() => setActiveTab("price")}
            >
              Price Feedback <span className="ml-1 bg-gray-200 rounded px-2">3</span>
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "request" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
              onClick={() => setActiveTab("request")}
            >
              Request Info <span className="ml-1 bg-gray-200 rounded px-2">2</span>
            </button>
          </div>
          {/* Tab Content */}
          {activeTab === "estimate" && (
            <>
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
              <button className="border px-8 py-2 rounded font-medium" onClick={() => setShowHourly(true)}>Hourly Booking</button>
            </div>
            {/* Hourly Booking Form Modal */}
            {showHourly && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="bg-white rounded-2xl p-8 w-[700px] shadow-lg relative">
                  <button className="absolute top-4 right-4 text-2xl text-gray-700" onClick={() => setShowHourly(false)}>&times;</button>
                  <div className="text-2xl font-semibold mb-8 text-gray-900">Hourly Booking</div>
                  <form>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Title</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" value={booking.title} disabled />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Email</label>
                        <input type="email" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" value={booking.customer.email} disabled />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Customer Name</label>
                        <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" value={booking.customer.name} disabled />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Select Service</label>
                        <select className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base">
                          <option>Select Service</option>
                          <option>Flooring and Tile Services</option>
                          <option>Appliance Install</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Minimum Hour</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" placeholder="Enter Minimum Hour" />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Charge for minimum Hour (in $)</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" placeholder="Enter Minimum Hour" />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Charge Additional Per Hour (in $)</label>
                        <input type="number" className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" placeholder="Enter Minimum Hour" />
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2 text-gray-700">Description</label>
                        <textarea className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base" rows={3} placeholder="Enter Description"></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button type="button" className="bg-black text-white px-10 py-3 rounded-xl font-medium text-lg">Book</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            </>
          )}
          {activeTab === "price" && (
            <div>
              <div className="bg-white rounded-2xl p-6 mb-8">
                <div className="text-xl font-semibold mb-4 text-gray-800">Price Feedback <span className="ml-1 bg-gray-200 rounded px-2 text-base font-normal">(3)</span></div>
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-gray-700 text-sm">
                      <th className="px-3 py-2 font-medium"><input type="checkbox" className="accent-black" /> <span className="ml-2 align-middle">▼</span></th>
                      <th className="px-3 py-2 font-medium">Service Name</th>
                      <th className="px-3 py-2 font-medium">Requests</th>
                      <th className="px-3 py-2 font-medium">Optimal Amount</th>
                      <th className="px-3 py-2 font-medium">Created At <span className="inline-block align-middle">▼</span></th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyFeedback.map((row) => (
                      <tr key={row.id} className="border-b text-sm">
                        <td className="px-3 py-2 text-center"><input type="checkbox" className="accent-black" /></td>
                        <td className="px-3 py-2 font-normal text-gray-900">{row.service}</td>
                        <td className="px-3 py-2 text-gray-700">{row.requests}</td>
                        <td className="px-3 py-2 text-gray-700">{row.amount}</td>
                        <td className="px-3 py-2 text-gray-700">{row.created}</td>
                        <td className="px-3 py-2">
                          {row.status === "Sent" ? (
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded font-medium text-xs">Sent</span>
                          ) : (
                            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded font-medium text-xs">Not Sent</span>
                          )}
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <button className="text-yellow-500 hover:text-yellow-600" title="View">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <div className="relative group">
                            <button className="text-gray-400 hover:text-black" title="Menu">
                              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                            </button>
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                              <button className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-gray-100 w-full text-sm" onClick={() => setEditId(row.id)}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12l1.5-1.5a2 2 0 0 1 2.83 0l1.5 1.5"/><path d="M2 12v6a2 2 0 0 0 2 2h6"/><path d="M16 2l6 6"/><path d="M16 2v6h6"/></svg>
                                Send
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100 w-full text-sm" onClick={() => setEditId(row.id)}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                                Edit
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          {activeTab === "request" && (
            <>
              <div className="bg-white rounded-2xl p-6 mb-8">
                <div className="text-xl font-semibold mb-4 text-gray-800">Request Info <span className="ml-1 bg-gray-200 rounded px-2 text-base font-normal">(2)</span></div>
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-gray-700 text-sm">
                      <th className="px-3 py-2 font-medium"><input type="checkbox" className="accent-black" /> <span className="ml-2 align-middle">▼</span></th>
                      <th className="px-3 py-2 font-medium">Request Message</th>
                      <th className="px-3 py-2 font-medium">Response Status</th>
                      <th className="px-3 py-2 font-medium">Created At <span className="inline-block align-middle">▼</span></th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{
                      id: 1,
                      message: "My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working...",
                      response: "No Response",
                      created: "28 July, 2025 at 16:49:37",
                      status: "Not Added"
                    }, {
                      id: 2,
                      message: "My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working...",
                      response: "Received",
                      created: "28 July, 2025 at 16:49:37",
                      status: "Added"
                    }, {
                      id: 3,
                      message: "My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working...",
                      response: "Received",
                      created: "28 July, 2025 at 16:49:37",
                      status: "Added"
                    }].map((row) => (
                      <tr key={row.id} className="border-b text-sm">
                        <td className="px-3 py-2 text-center"><input type="checkbox" className="accent-black" /></td>
                        <td className="px-3 py-2 font-normal text-gray-900">{row.message}</td>
                        <td className="px-3 py-2">
                          {row.response === "Received" ? (
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded font-medium text-xs">Received</span>
                          ) : (
                            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded font-medium text-xs">No Response</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-700">{row.created}</td>
                        <td className="px-3 py-2">
                          {row.status === "Added" ? (
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded font-medium text-xs">Added</span>
                          ) : (
                            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded font-medium text-xs">Not Added</span>
                          )}
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2 relative">
                          <button className="text-yellow-500 hover:text-yellow-600" title="View">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <div className="relative group">
                            <button className="text-gray-400 hover:text-black" title="Menu">
                              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                            </button>
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                              <button className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-gray-100 w-full text-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M19 12H5"/></svg>
                                Add Response
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100 w-full text-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                                Edit
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
              <div ></div>
                
              </div>
          )}

    </div>
  );
};

export default BookingDetails;
