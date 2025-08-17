import React from 'react';

const TeamSection = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Team Section</h2>
        <p className="text-gray-600 mt-1">Manage your team members and their information</p>
      </div>

      {/* Coming Soon Message */}
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Team Management</h3>
          <p className="text-gray-500">This section is coming soon!</p>
          <p className="text-sm text-gray-400 mt-2">You'll be able to add, edit, and manage team member profiles here.</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
