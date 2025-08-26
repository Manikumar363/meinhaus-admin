import React, { useState } from 'react';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');

  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col p-4 h-screen">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Meinhaus</h2>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <div className="px-4 py-2 font-semibold">Content Management</div>
            <ul className="ml-4 space-y-1">
              <li>
                <a href="#" className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white">
                  Home Page
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'about' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('about')}
            >
              <span>About Page</span>
            </div>
          </li>
          <li>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'contact' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('contact')}
            >
              <span>Contact Us</span>
            </div>
          </li>
          <li>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'education' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('education')}
            >
              <span>Education Page</span>
            </div>
          </li>
          <li>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'gallery' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu('gallery')}
            >
              <span>Gallery Page</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
