import React from "react";

const PaidJobDetails = () => {
  // Static data from previous paid screen
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button className="text-gray-600 hover:text-gray-800" onClick={() => window.history.back()}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="text-gray-600">Assign / Appliance Install / </span>
          <span className="text-black font-medium">#OC-6543HT87</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Project and Service Details</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Jayme Savage</span>
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JS</span>
                </div>
                <span className="text-xs text-gray-400">Shared By: </span>
                <span className="text-xs text-orange-500 font-medium">Professional</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Project Title</div>
                    <div className="font-semibold text-gray-900">Home Painting</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Service Name</div>
                    <div className="font-semibold text-gray-900">Appliance Install</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Service Amount</div>
                    <div className="font-semibold text-gray-900">$5423</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Registration Amount</div>
                    <div className="font-semibold text-gray-900">$50</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James Robert" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Customer Name</div>
                    <div className="font-semibold text-gray-900">James Robert</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Service Created At</div>
                    <div className="font-semibold text-gray-900">03 July 2025, 20:56</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Address</div>
                    <div className="font-semibold text-gray-900">3401 Dufferin Street, Wimbledon, Toronto, Vaughan, Canada, M6A 2T9</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Project Description & Images</h2>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center" alt="Bathroom renovation project 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center" alt="Bathroom renovation project 2" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-gray-400 font-medium ml-1">2+</span>
              </div>
            </div>
            <div className="text-gray-500 text-sm leading-relaxed mb-6">
              My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly. My Bathroom Pipeline Is Damaged And All Taps Are Broken, Shower Is Not Working Properly.
              <span className="text-blue-500 cursor-pointer font-medium"> Readmore...</span>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <div className="text-sm text-gray-400 mb-3">Generated Link will appear here</div>
              <button className="bg-blue-500 text-white py-2.5 px-4 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 transition-colors">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                Get Link
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Share Job via Link</h2>
          <p className="text-gray-500 text-sm mb-6">Generate and send a unique link to selected professionals so they can view and accept this job.</p>
          <button className="bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors">Create & Send Link</button>
        </div>
      </div>
    </div>
  );
};

export default PaidJobDetails;
