import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MessageIcon, EditIcon1 } from "../ui/icons";
import Assign from "../ui/assign";
import Unassign from "../ui/unassign";
import { VideoIcon, BagIcon, TotalView, TotalJobs, UniqueviewIcon } from "../ui/icons";

const professionals = [
  {
    id: 1,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Sent",
    duration: "-",
    availability: "On Time",
    appliedAt: "-",
    action: "Assign",
  },
  {
    id: 2,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Viewed",
    duration: "1 Day",
    availability: "Late",
    appliedAt: "12 June 2025 at 06:15:24",
    action: "Assign",
  },
  {
    id: 3,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Applied",
    duration: "1 Day",
    availability: "2025-06-13 10:00:00:00",
    appliedAt: "12 June 2025 at 06:15:24",
    action: "Assign",
  },
  {
    id: 4,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Applied",
    duration: "1 Day",
    availability: "2025-06-13 10:00:00:00",
    appliedAt: "12 June 2025 at 06:15:24",
    action: "Unassign",
  },
];

const stats = [
  { label: "Unique View", value: 34, color: "bg-purple-100 text-purple-600", icon: <UniqueviewIcon /> },
  { label: "Total Views", value: 643, color: "bg-blue-100 text-blue-600", icon: <TotalView /> },
  { label: "Total Jobs Sent", value: 643, color: "bg-yellow-100 text-yellow-600", icon: <TotalJobs /> },
  { label: "Total Applied", value: 543, color: "bg-green-100 text-green-600", icon: <BagIcon /> },
  { label: "Total Subscribed", value: 23, color: "bg-pink-100 text-pink-600", icon: <VideoIcon /> },
];

const CreateSend = () => {
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showBulkSmsModal, setShowBulkSmsModal] = useState(false);
  const [showSmsHistoryModal, setShowSmsHistoryModal] = useState(false);
  const [bulkSmsTab, setBulkSmsTab] = useState('User');
  const [activeTab, setActiveTab] = useState("Create Link");
  const navigate = useNavigate();
  const [showDesc, setShowDesc] = useState(false);
  const [smsPopupIdx, setSmsPopupIdx] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [selectedPro, setSelectedPro] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button className="text-gray-600 hover:text-gray-800">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="text-gray-600 font-semibold">Assign</span>
          <span className="text-gray-600">/ Appliance Install / </span>
          <span className="text-black font-bold">#OC-6543HT87</span>
          <div className="ml-auto text-blue-600 font-medium cursor-pointer flex items-center gap-1">Show Project Details <span className="text-xs">▼</span></div>
        </div>
        <div className="flex items-center border-b mb-4">
          <button
            className={`mr-6 pb-2 font-semibold text-base focus:outline-none ${activeTab === "Create Link" ? "text-black border-b-2 border-black" : "text-gray-400"}`}
            style={{ background: "none" }}
            onClick={() => setActiveTab("Create Link")}
          >
            Create Link
          </button>
          <button
            className={`mr-6 pb-2 font-semibold text-base focus:outline-none ${activeTab === "Direct Assign" ? "text-black border-b-2 border-black" : "text-gray-400"}`}
            style={{ background: "none" }}
            onClick={() => {
              setActiveTab("Direct Assign");
              navigate('/direct-assign');
            }}
          >
            Direct Assign
          </button>
          <button
            className={`pb-2 font-semibold text-base focus:outline-none ${activeTab === "Bidding" ? "text-black border-b-2 border-black" : "text-gray-400"}`}
            style={{ background: "none" }}
            onClick={() => {
              setActiveTab("Bidding");
              navigate('/bidding');
            }}
          >
            Bidding
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-12">
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-1">Pro Trade Amount</div>
                  <div className="font-bold text-md text-[#262626]">$5423</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-1">Link Send Status</div>
                  <div className="text-base font-medium text-[#262626]">Sent via Email & SMS</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-1">Action</div>
                  <div className="flex gap-2 mt-1">
                    <button className="bg-gray-200 px-4 py-2 rounded font-medium">Sent Via Email</button>
                    <button className="bg-gray-200 px-4 py-2 rounded font-medium">Send Via SMS</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button className="p-2 rounded-full hover:bg-gray-100 border" onClick={() => setShowSmsHistoryModal(true)}><MessageIcon /></button>
                <button className="p-2 rounded-full hover:bg-gray-100 border" onClick={() => setShowEditJobModal(true)}><EditIcon1 /></button>
              </div>
            </div>
            <div className="flex gap-12 mb-2">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Start Date</div>
                <div className="font-medium text-base">11-08-2025</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Link Sent On</div>
                <div className="font-medium text-base">23 July 2025, 04:45:05</div>
              </div>
              <div className="flex items-end">
                <span className="text-blue-400 font-medium text-base cursor-pointer" onClick={() => setShowDesc(!showDesc)}>
                  {showDesc ? 'Read Less' : 'Read More'} <span className="ml-1">{showDesc ? '▲' : '▼'}</span>
                </span>
              </div>
            </div>
            {showDesc && (
              <div className="mt-2">
                <div className="text-gray-400 text-sm font-semibold mb-1">Description</div>
                <div className="font-medium text-base leading-relaxed">
                  My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly.My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly.
                </div>
              </div>
            )}
        </div>

        <div className="flex gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`rounded-lg px-6 py-4 font-bold text-lg flex items-center gap-3 ${stat.color}`}>
              <span className="inline-block align-middle">{stat.icon}</span>
              <span>{stat.value}</span>
              <span className="block text-xs font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex gap-4 mb-4">
            <input className="border rounded px-4 py-1 w-1/3" placeholder="Search by Name, Email or Phone" />
            <input className="border rounded px-4 py-1 w-1/3" placeholder="Search City or State" />
            <select className="border rounded px-4 py-1 w-1/4">
              <option>All Statuses</option>
              <option>Sent</option>
              <option>Viewed</option>
              <option>Applied</option>
              <option>Subscribed</option>
            </select>
            <button className="border rounded px-4 py-2">Show Advanced Filter</button>
          </div>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-700 text-sm border-b">
                <th className="px-2 py-2 font-semibold"><input type="checkbox" /></th>
                <th className="px-2 py-2 font-semibold">S.No.</th>
                <th className="px-2 py-2 font-semibold">View</th>
                <th className="px-2 py-2 font-semibold">Professional</th>
                <th className="px-2 py-2 font-semibold">Status</th>
                <th className="px-2 py-2 font-semibold">Duration</th>
                <th className="px-2 py-2 font-semibold">Availability</th>
                <th className="px-2 py-2 font-semibold">Applied At</th>
                <th className="px-2 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map((pro, idx) => (
                <tr key={pro.id} className="border-b text-sm relative">
                  <td className="px-2 py-2" style={{ position: 'relative' }}>
                    <input
                      type="checkbox"
                      onClick={e => {
                        e.stopPropagation();
                        setSmsPopupIdx(smsPopupIdx === idx ? null : idx);
                      }}
                    />
                    {smsPopupIdx === idx && (
                      <div style={{ position: 'absolute', left: '40px', top: '0', zIndex: 20 }} className="bg-white rounded-xl shadow-xl p-4 w-64 border">
                        <div className="font-bold text-lg mb-2">Send SMS</div>
                        <hr className="mb-2" />
                        <div
                          className="text-gray-400 font-semibold py-2 border-b cursor-pointer hover:text-blue-600"
                          onClick={() => setShowBulkSmsModal(true)}
                        >
                          Send Job Link(SMS)
                        </div>
                        <div className="text-gray-400 font-semibold py-2 cursor-pointer hover:text-blue-600">Send Job Link(Email)</div>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2">{idx + 1}</td>
                  <td className="px-2 py-2 text-blue-600 cursor-pointer underline">1 View</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2 relative group">
                      <img src={pro.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
                      <div>
                        <div className="font-medium">{pro.name}</div>
                        <div className="text-xs text-gray-500">{pro.location}</div>
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute left-10 top-0 z-10 hidden group-hover:block bg-white border rounded-lg shadow-lg p-3 text-xs min-w-[180px]">
                        <div className="font-bold mb-1">{pro.name}</div>
                        <div className="mb-1">{pro.email}</div>
                        <div className="mb-1">{pro.location}</div>
                        <div>{pro.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${pro.status === 'Sent' ? 'bg-purple-100 text-purple-600' : pro.status === 'Viewed' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{pro.status}</span>
                  </td>
                  <td className="px-2 py-2">{pro.duration}</td>
                  <td className="px-2 py-2">{pro.availability}</td>
                  <td className="px-2 py-2">{pro.appliedAt}</td>
                  <td className="px-2 py-2">
                    {pro.action === "Assign" ? (
                      <button
                        className="px-4 py-2 rounded font-semibold bg-lime-500 text-white"
                        onClick={() => {
                          setSelectedPro(pro);
                          setShowAssignModal(true);
                        }}
                      >Assign</button>
                    ) : (
                      <button
                        className="px-4 py-2 rounded font-semibold bg-red-500 text-white"
                        onClick={() => {
                          setSelectedPro(pro);
                          setShowUnassignModal(true);
                        }}
                      >Unassign</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    {/* Edit Job Link Details Modal */}
    {showAssignModal && selectedPro && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <Assign professionalName={selectedPro.name} onClose={() => { setShowAssignModal(false); setSelectedPro(null); }} />
      </div>
    )}
    {showUnassignModal && selectedPro && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <Unassign professionalName={selectedPro.name} onClose={() => { setShowUnassignModal(false); setSelectedPro(null); }} />
      </div>
    )}
  {showEditJobModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-2xl shadow-xl w-[500px] max-w-full max-h-[90vh] p-5 relative animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
            onClick={() => setShowEditJobModal(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="text-2xl font-bold mb-6">Edit Job Link Details</div>
          <div className="flex justify-between mb-4">
            <div>
              <div className="text-gray-500">Service Name: <span className="font-bold text-black">Appliance Install</span></div>
              <div className="text-gray-500">Location: <span className="font-bold text-black">Ontario</span></div>
            </div>
            <div className="text-right">
              <div className="text-gray-500">Service Amount: <span className="font-bold text-orange-500">$5423</span></div>
              <div className="text-gray-500">Registration Amount: <span className="font-bold text-orange-500">$50</span></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold mb-2">Professional Trade Amount</div>
            <input type="text" className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100" value="$ 1850" disabled />
          </div>
          <div className="mb-4">
            <div className="font-bold mb-1">Start Date <span className="text-gray-400 text-sm">(The date from which the project will start.)</span></div>
            <div className="relative">
              <input type="text" className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100" placeholder="Select Date" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2">{/* Calendar SVG here */}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold mb-1">Description <span className="text-gray-400 text-sm">(For Professional)</span></div>
            <textarea className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100" rows={3} placeholder="Enter description" />
          </div>
          <div className="mb-4">
            <div className="font-bold mb-2">Images</div>
            <div className="flex items-center gap-2 mb-2">
              {/* Example images, replace src with actual image URLs */}
              <div className="relative">
                <img src="/images/img1.jpg" alt="img1" className="w-20 h-16 rounded-lg object-cover" />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">{/* X SVG here */}</button>
              </div>
              <div className="relative">
                <img src="/images/img2.jpg" alt="img2" className="w-20 h-16 rounded-lg object-cover" />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">{/* X SVG here */}</button>
              </div>
              <div className="relative">
                <img src="/images/img3.jpg" alt="img3" className="w-20 h-16 rounded-lg object-cover" />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">{/* X SVG here */}</button>
              </div>
              <button className="flex items-center gap-2 border rounded-lg px-4 py-2 font-semibold"><span>{/* Upload SVG here */}</span>Upload Images</button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="w-full bg-black text-white rounded-xl py-3 text-md font-semibold">Update</button>
            {/*<div className="bg-orange-50 rounded-xl p-4">
              <div className="font-bold text-gray-700 mb-1">NOTE:</div>
              <ul className="list-disc pl-5 text-gray-600 text-base">
                <li>Update button only updates the project details.</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      )}
      {/* SMS History Modal */}
      {showSmsHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white ml-12 rounded-2xl shadow-xl w-[1000px] max-w-full max-h-[80vh] p-4 relative animate-fadeIn">
            <button
              className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
              onClick={() => setShowSmsHistoryModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-2xl font-bold mb-2">SMS History</div>
            <div className="text-gray-500 mb-6 text-base">(Here, you can check the message you sent to the professional, see whom you selected, and how many professionals you selected.)</div>
            <div className="border rounded-xl overflow-hidden">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-lg border-b">
                    <th className="px-6 py-4 font-semibold">S.No.</th>
                    <th className="px-6 py-4 font-semibold">SMS Sent Time</th>
                    <th className="px-6 py-4 font-semibold">No. of Pro</th>
                    <th className="px-6 py-4 font-semibold">Professional Name</th>
                    <th className="px-6 py-4 font-semibold">SMS Message</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2].map((row, idx) => (
                    <tr key={idx} className="border-b align-top">
                      <td className="px-6 py-6 text-lg font-medium">1</td>
                      <td className="px-6 py-6 text-base">28 August, 2025<br/>at 11:45:05</td>
                      <td className="px-6 py-6 text-base">25</td>
                      <td className="px-6 py-6 text-base">James, Robert, Serena Vazquez, Mackensie, Hilary Lane, Sydney, Ezekiel, Xander, Nero Middleton, Graham Lyons</td>
                      <td className="px-6 py-6 text-base">We are reaching out to request your assistance with a repair job involving brief description of the appliance, e.g., a malfunctioning refrigerator located at location/address. The issue was reported on date, and <span className="text-blue-500 underline cursor-pointer">Read more...</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )}
    {showBulkSmsModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-2xl shadow-xl w-[800px] max-w-full p-8 relative animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
            onClick={() => setShowBulkSmsModal(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold">Send Bulk SMS</div>
            <div className="flex items-center gap-4">
              <span className="bg-orange-500 text-white rounded-full px-4 py-1 font-semibold text-base">Selected professionals: 56</span>
              <span className="font-semibold text-lg">Sending From:</span>
              <select className="border rounded px-3 py-2 text-base font-medium">
                <option>+16479309066</option>
                <option>+16470000000</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mb-8">
              <div className="font-bold text-xl mb-4">Available Placeholders</div>
              <div className="flex gap-8 border-b mb-4">
                <button
                  className={`pb-2 font-semibold text-base focus:outline-none ${bulkSmsTab === 'User' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                  onClick={() => setBulkSmsTab('User')}
                >User</button>
                <button
                  className={`pb-2 font-semibold text-base focus:outline-none ${bulkSmsTab === 'Professional' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                  onClick={() => setBulkSmsTab('Professional')}
                >Professional</button>
                <button
                  className={`pb-2 font-semibold text-base focus:outline-none ${bulkSmsTab === 'Service' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                  onClick={() => setBulkSmsTab('Service')}
                >Service</button>
              </div>
              {/* Tab Content */}
              {bulkSmsTab === 'User' && (
                <div>
                  <div className="mb-4">
                    <span className="font-bold">{'{user_name}'}</span>
                    <div className="text-gray-500 text-sm">Recipient’s full name (looked up by phone/email)</div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">{'{join_date}'}</span>
                    <div className="text-gray-500 text-sm">User’s account creation date</div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">{'{city_name}'}</span>
                    <div className="text-gray-500 text-sm">Name of the city based on default address of the user</div>
                  </div>
                </div>
              )}
              {bulkSmsTab === 'Professional' && (
                <div>
                  <div className="mb-4">
                    <span className="font-bold">{'{Pro_register_link}'}</span>
                    <div className="text-gray-500 text-sm">Unique registration link for all professionals to access their accounts</div>
                  </div>
                </div>
              )}
              {bulkSmsTab === 'Service' && (
                <div>
                  <div className="mb-4">
                    <span className="font-bold">{'{service_name:SERVICE-ID}'}</span>
                    <div className="text-gray-500 text-sm">Name of the service with service ID</div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">{'{interested_services}'}</span>
                    <div className="text-gray-500 text-sm">List of interested services of the user</div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full max-w-2xl flex items-center gap-3 mt-2 bg-white rounded-full px-4 py-2 border">
              <button className="text-2xl text-gray-400 bg-transparent border-none">{<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              }</button>
              <button className="text-xl text-gray-400 bg-transparent border-none">{<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.47 7.774C1.422 7.59667 1.898 7.10667 1.898 6.304C1.898 5.94933 1.85133 5.34267 1.758 4.484C1.66467 3.56933 1.618 2.90667 1.618 2.496C1.618 1.824 1.80467 1.31067 2.178 0.956C2.56067 0.601333 3.06933 0.424 3.704 0.424H4.516V1.53H3.942C3.578 1.53 3.30733 1.614 3.13 1.782C2.95267 1.94067 2.864 2.20667 2.864 2.58C2.864 2.85067 2.88267 3.18667 2.92 3.588C2.95733 3.98 2.98067 4.246 2.99 4.386C3.08333 5.282 3.13 5.93533 3.13 6.346C3.13 6.84067 3.004 7.256 2.752 7.592C2.50933 7.91867 2.13133 8.138 1.618 8.25V8.278C2.13133 8.39 2.50933 8.614 2.752 8.95C3.004 9.286 3.13 9.70133 3.13 10.196C3.13 10.6067 3.08333 11.26 2.99 12.156C2.98067 12.296 2.95733 12.5667 2.92 12.968C2.88267 13.36 2.864 13.6913 2.864 13.962C2.864 14.3353 2.95267 14.6013 3.13 14.76C3.30733 14.928 3.578 15.012 3.942 15.012H4.516V16.118H3.704C3.06933 16.118 2.56067 15.9407 2.178 15.586C1.80467 15.2313 1.618 14.718 1.618 14.046C1.618 13.6353 1.66467 12.9727 1.758 12.058C1.85133 11.1993 1.898 10.5927 1.898 10.238C1.898 9.43533 1.422 8.94533 0.47 8.768V7.774ZM10.8848 4.12L11.3888 5.03L9.4428 5.842L11.4028 6.64L10.8708 7.578L9.1768 6.346L9.4008 8.46H8.3508L8.5608 6.346L6.8668 7.592L6.3208 6.64L8.2668 5.828L6.3208 5.044L6.8388 4.106L8.5748 5.352L8.3508 3.224H9.4148L9.1768 5.352L10.8848 4.12ZM17.2734 8.768C16.3214 8.94533 15.8454 9.43533 15.8454 10.238C15.8454 10.5927 15.8921 11.1993 15.9854 12.058C16.0787 12.9727 16.1254 13.6353 16.1254 14.046C16.1254 14.718 15.9341 15.2313 15.5514 15.586C15.1781 15.9407 14.6741 16.118 14.0394 16.118H13.2274V15.012H13.8014C14.1654 15.012 14.4361 14.928 14.6134 14.76C14.7907 14.6013 14.8794 14.3353 14.8794 13.962C14.8794 13.6913 14.8607 13.36 14.8234 12.968C14.7861 12.5667 14.7627 12.296 14.7534 12.156C14.6601 11.26 14.6134 10.6067 14.6134 10.196C14.6134 9.70133 14.7347 9.286 14.9774 8.95C15.2294 8.614 15.6121 8.39 16.1254 8.278V8.25C15.6121 8.138 15.2294 7.91867 14.9774 7.592C14.7347 7.256 14.6134 6.84067 14.6134 6.346C14.6134 5.93533 14.6601 5.282 14.7534 4.386C14.7627 4.246 14.7861 3.98 14.8234 3.588C14.8607 3.18667 14.8794 2.85067 14.8794 2.58C14.8794 2.20667 14.7907 1.94067 14.6134 1.782C14.4361 1.614 14.1654 1.53 13.8014 1.53H13.2274V0.424H14.0394C14.6741 0.424 15.1781 0.601333 15.5514 0.956C15.9341 1.31067 16.1254 1.824 16.1254 2.496C16.1254 2.90667 16.0787 3.56933 15.9854 4.484C15.8921 5.34267 15.8454 5.94933 15.8454 6.304C15.8454 7.10667 16.3214 7.59667 17.2734 7.774V8.768Z" fill="#9D9D9D"/>
                </svg>
              }</button>
              <button className="text-xl text-gray-400 bg-transparent border-none">{<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1297 9.00028V15.7432C10.1375 16.2363 10.3388 16.7066 10.6903 17.0525C11.0417 17.3984 11.5151 17.5923 12.0082 17.5923C12.5013 17.5923 12.9747 17.3984 13.3261 17.0525C13.6776 16.7066 13.8789 16.2363 13.8867 15.7432L13.8928 6.90496C13.8979 6.48353 13.8193 6.06526 13.6616 5.67442C13.5039 5.28358 13.2701 4.92794 12.9739 4.62812C12.6777 4.32829 12.3249 4.09024 11.936 3.92777C11.5471 3.7653 11.1298 3.68164 10.7084 3.68164C10.2869 3.68164 9.86961 3.7653 9.48071 3.92777C9.09182 4.09024 8.73904 4.32829 8.44283 4.62812C8.14661 4.92794 7.91286 5.28358 7.75512 5.67442C7.59738 6.06526 7.51879 6.48353 7.52391 6.90496V15.8028C7.51532 16.3961 7.62477 16.9852 7.84588 17.5359C8.067 18.0865 8.39537 18.5877 8.81191 19.0103C9.22845 19.4329 9.72484 19.7685 10.2722 19.9976C10.8196 20.2266 11.4071 20.3446 12.0005 20.3446C12.5939 20.3446 13.1813 20.2266 13.7287 19.9976C14.2761 19.7685 14.7725 19.4329 15.189 19.0103C15.6056 18.5877 15.9339 18.0865 16.1551 17.5359C16.3762 16.9852 16.4856 16.3961 16.477 15.8028V7.48809" stroke="#9D9D9D" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
              }</button>
              
              <input className="flex-1 border-none outline-none px-2 py-2 text-base text-gray-500 bg-transparent" placeholder="Type Here..." />
              <button className="text-2xl text-blue-500 bg-transparent border-none ml-2">{<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9902 6.0096L5.39821 10.5626L9.59321 12.9906L13.2922 9.2906C13.4799 9.10309 13.7343 8.99781 13.9996 8.9979C14.2648 8.99799 14.5192 9.10346 14.7067 9.2911C14.8942 9.47874 14.9995 9.73319 14.9994 9.99846C14.9993 10.2637 14.8939 10.5181 14.7062 10.7056L11.0062 14.4056L13.4362 18.5996L17.9902 6.0096ZM18.3132 3.7656C19.5082 3.3326 20.6662 4.4906 20.2332 5.6856L14.9512 20.2906C14.5172 21.4886 12.8812 21.6346 12.2422 20.5316L9.02521 14.9736L3.46721 11.7566C2.36421 11.1176 2.51021 9.4816 3.70821 9.0476L18.3132 3.7656Z" fill="#1E9BD0"/>
                </svg>
              }</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default CreateSend;
