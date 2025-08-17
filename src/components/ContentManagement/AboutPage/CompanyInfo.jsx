import React, { useState } from 'react';

const CompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'MEINHAUS',
    founded: '2010',
    employees: '50+',
    projects: '500+',
    description: 'MEINHAUS is a leading general contractor company specializing in residential and commercial construction projects.',
    address: '123 Construction Ave, Building City, BC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@meinhaus.com',
    website: 'www.meinhaus.com'
  });

  const handleSave = () => {
    console.log('Saving company info:', companyInfo);
    alert('Company information saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
        <p className="text-gray-600 mt-1">Manage your company details and contact information</p>
      </div>

      {/* Company Details Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyInfo.companyName}
              onChange={(e) => setCompanyInfo({...companyInfo, companyName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
            <input
              type="text"
              value={companyInfo.founded}
              onChange={(e) => setCompanyInfo({...companyInfo, founded: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
            <input
              type="text"
              value={companyInfo.employees}
              onChange={(e) => setCompanyInfo({...companyInfo, employees: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Projects Completed</label>
            <input
              type="text"
              value={companyInfo.projects}
              onChange={(e) => setCompanyInfo({...companyInfo, projects: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
          <textarea
            value={companyInfo.description}
            onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={companyInfo.address}
            onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="text"
              value={companyInfo.website}
              onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Company Information
        </button>
      </div>
    </div>
  );
};

export default CompanyInfo;
