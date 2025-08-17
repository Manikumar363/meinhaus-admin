import React from 'react';

const MissionVision = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Mission & Vision</h2>
        <p className="text-gray-600 mt-1">Manage your company's mission and vision statements</p>
      </div>

      {/* Coming Soon Message */}
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Mission & Vision Management</h3>
          <p className="text-gray-500">This section is coming soon!</p>
          <p className="text-sm text-gray-400 mt-2">You'll be able to define and edit your company's mission and vision here.</p>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
