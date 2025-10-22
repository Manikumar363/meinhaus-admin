import React, { useState } from "react";
import { useNavigate } from "react-router";

const DirectAssign = () => {
  const navigate = useNavigate();
  const [showAssignModal, setShowAssignModal] = useState(false);
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
          <div className="ml-auto text-blue-600 font-medium cursor-pointer flex items-center gap-1">Show Service Details <span className="text-xs">▼</span></div>
        </div>
        <div className="flex items-center border-b mb-4">
          <button className="mr-6 pb-2 font-semibold text-base focus:outline-none text-gray-400" style={{ background: "none" }}
            onClick={() => navigate('/create-send')}
          >Create Link</button>
          <button className="mr-6 pb-2 font-semibold text-base focus:outline-none text-black border-b-2 border-black" style={{ background: "none" }}
            onClick={() => navigate('/direct-assign')}
          >Direct Assign</button>
          <button className="pb-2 font-semibold text-base focus:outline-none text-gray-400" style={{ background: "none" }}
            onClick={() => navigate('/bidding')}
          >Bidding</button>
        </div>
        <div className="flex flex-col items-center justify-center mt-32">
          <div className="text-xl font-bold mb-2">Share Job via Link</div>
          <div className="text-gray-500 text-base mb-6 text-center" style={{ maxWidth: 400 }}>
            Generate and send a unique link to selected professionals so they can view and accept this job.
          </div>
          <button className="bg-black text-white rounded-lg px-6 py-3 font-semibold text-base" onClick={() => setShowAssignModal(true)}>Create &amp; Send Link</button>
        </div>
      {/* Assign Professional Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-[500px] max-w-full max-h-[95vh] p-7 relative animate-fadeIn overflow-y-auto">
            <button
              className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
              onClick={() => setShowAssignModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-2xl font-bold mb-6">Assign Professional</div>
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
              <div className="font-bold mb-1">Assign Professionals Directly</div>
              <input type="text" className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100" placeholder="Choose Professional" />
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
            <button className="w-full bg-black text-white rounded-xl py-3 text-md font-semibold mt-2" onClick={() => { setShowAssignModal(false); navigate('/direct-assign/1'); }}>Assign</button>
            <div className="bg-orange-50 rounded-xl p-4 mt-4">
              <div className="font-bold text-gray-700 mb-1">NOTE:</div>
              <ul className="list-disc pl-5 text-gray-600 text-base">
                <li>Via direct assign, the professional you choose will be assigned directly.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DirectAssign;
