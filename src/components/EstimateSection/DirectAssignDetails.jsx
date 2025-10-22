import React, { useState } from "react";
import { useNavigate } from "react-router";
import Unassign from "../ui/unassign";
import { EditIcon1 } from "../ui/icons";

const professionals = [
  {
    id: 1,
    name: "James Robert",
    email: "jamesrobert@gmail.com",
    phone: "+1209876534",
    location: "Montreal, Quebec",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Viewed",
    viewedAt: "11 Aug 2025 at 06:03:12",
  },
];

const DirectAssignDetails = () => {
  const navigate = useNavigate();
  const [showDesc, setShowDesc] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [selectedPro, setSelectedPro] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
          <button className="mr-6 pb-2 font-semibold text-base focus:outline-none text-gray-400" style={{ background: "none" }} onClick={() => navigate('/create-send')}>Create Link</button>
          <button className="mr-6 pb-2 font-semibold text-base focus:outline-none text-black border-b-2 border-black" style={{ background: "none" }} onClick={() => navigate('/direct-assign')}>Direct Assign</button>
          <button className="pb-2 font-semibold text-base focus:outline-none text-gray-400" style={{ background: "none" }} onClick={()=> navigate('/bidding')} >Bidding</button>
        </div>
        <div className="flex gap-12 mb-4 items-end">
          <div>
            <div className="text-gray-400 text-sm font-medium mb-1">Pro Trade Amount</div>
            <div className="font-bold text-md text-[#262626]">$5423</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm font-medium mb-1">Start Date</div>
            <div className="font-medium text-base">11-08-2025</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm font-medium mb-1">Assigned On</div>
            <div className="font-medium text-base">23 July 2025, 04:45:05</div>
          </div>
          <div className="flex items-end ml-auto gap-4">
            <span className="text-blue-400 font-medium text-base cursor-pointer" onClick={() => setShowDesc(!showDesc)}>
              {showDesc ? 'Read Less' : 'Read More'} <span className="ml-1">{showDesc ? '▲' : '▼'}</span>
            </span>
            <span className="cursor-pointer" onClick={() => setShowEditModal(true)}><EditIcon1/></span>
          </div>
        </div>
        {showDesc && (
          <div className="mt-2 mb-4">
            <div className="text-gray-400 text-sm font-semibold mb-1">Description</div>
            <div className="font-medium text-base leading-relaxed">
              My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly.My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly.
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow p-6">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-700 text-sm border-b">
                <th className="px-2 py-2 font-semibold">Rank</th>
                <th className="px-2 py-2 font-semibold">Pro Name</th>
                <th className="px-2 py-2 font-semibold">Status</th>
                <th className="px-2 py-2 font-semibold">Viewed At</th>
                <th className="px-2 py-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {professionals.map((pro, idx) => (
                <tr key={pro.id} className="border-b text-sm relative">
                  <td className="px-2 py-2">{idx + 1}</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2 relative"
                      onMouseEnter={() => setHoverIdx(idx)}
                      onMouseLeave={() => setHoverIdx(null)}
                    >
                      <img src={pro.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
                      <div>
                        <div className="font-medium">{pro.name} <span className="inline-block align-middle ml-1"><span className="bg-yellow-100 text-yellow-600 rounded-full px-2 py-0.5 text-xs font-bold">!</span> <span className="bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-bold">G</span></span></div>
                        <div className="text-xs text-gray-500">{pro.location}</div>
                      </div>
                      {hoverIdx === idx && (
                        <div className="absolute left-10 top-10 z-10 bg-white border rounded-lg shadow-lg p-3 text-xs min-w-[200px]">
                          <div className="font-bold mb-1">{pro.name}</div>
                          <div className="mb-1">{pro.email}</div>
                          <div className="mb-1">{pro.location}</div>
                          <div>{pro.phone}</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-600">{pro.status}</span>
                  </td>
                  <td className="px-2 py-2">{pro.viewedAt}</td>
                  <td className="px-2 py-2">
                    <button className="px-4 py-2 rounded font-semibold bg-blue-500 text-white mr-2">Send SMS</button>
                    <button
                      className="px-4 py-2 rounded font-semibold bg-red-500 text-white"
                      onClick={() => {
                        setSelectedPro(pro);
                        setShowUnassignModal(true);
                      }}
                    >Unassign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showUnassignModal && selectedPro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <Unassign professionalName={selectedPro.name} onClose={() => { setShowUnassignModal(false); setSelectedPro(null); }} />
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-[500px] max-w-full max-h-[95vh] p-8 relative animate-fadeIn overflow-y-auto">
            <button
              className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-2xl font-bold mb-4">Edit Details</div>
            <hr className="mb-6" />
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
              <div className="font-bold mb-2">Assign Professionals Directly</div>
              <input type="text" className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100" value="James Robert" disabled />
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
              <div className="bg-orange-50 rounded-xl p-4 mt-2">
                <div className="font-bold text-gray-700 mb-1">NOTE:</div>
                <ul className="list-disc pl-5 text-gray-600 text-base">
                  <li>Update button only updates the project details.</li>
                  <li>If you want to change the professional to a direct assignment, you can do so. However, the previously assigned professional will be automatically unassigned.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectAssignDetails;
