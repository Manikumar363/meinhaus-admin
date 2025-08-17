import React, { useState } from 'react';
import ContentManagement from '../components/ContentManagement/ContentManagement';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
                 {/* Logo and Branding */}
         <div className="p-6 border-b border-gray-700">
           <div className="flex items-center space-x-3">
             <img 
               src="/main-logo.png" 
               alt="MEINHAUS Logo" 
               className="w-full h-full object-contain"
             />
           </div>
         </div>

        {/* Create Estimate Button */}
        <div className="p-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium">
            + Create Estimate
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 mt-4">
          <div className="px-4 h-full flex flex-col">
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </div>

            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'content' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('content')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
                           <span>Content Management</span>
           </div>
           
           {/* Spacer to push content to top and fill remaining height */}
           <div className="flex-1"></div>
         </div>
       </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Menu and Title */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-4">
              {/* WiFi Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">10</span>
              </div>

              {/* Chat Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
              </div>

              {/* Bell Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 2.17a4 4 0 00-5.66 5.66l1.34 1.34m0 0l2.83 2.83 1.34-1.34m2.83-2.83L7.17 9.16M9 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">12</span>
              </div>

              {/* User Profile */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeMenu === 'dashboard' ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
              <p className="text-gray-600">
                Welcome to the MEINHAUS Admin Panel. Here you can manage your website content and monitor your business.
              </p>
              
              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Total Projects</p>
                      <p className="text-2xl font-bold text-blue-900">24</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Completed</p>
                      <p className="text-2xl font-bold text-green-900">18</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-600">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-900">6</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.89l-1.9 9a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM16 12V9a2 2 0 00-2-2H6a2 2 0 00-2 2v3m16 0v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3m16 0v-3a2 2 0 00-2-2H6a2 2 0 00-2 2v3" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Revenue</p>
                      <p className="text-2xl font-bold text-purple-900">$45.2K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Management</h2>
              <ContentManagement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
