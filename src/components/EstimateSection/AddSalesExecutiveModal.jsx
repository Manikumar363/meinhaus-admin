import React, { useState } from "react";

const AddSalesExecutiveModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedExecutive, setSelectedExecutive] = useState("");

  const handleAdd = () => {
    if (selectedExecutive) {
      onAdd(selectedExecutive);
      setSelectedExecutive("");
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedExecutive("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add Sales Executive</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Sales Executive
          </label>
          <div className="relative">
            <select
              value={selectedExecutive}
              onChange={(e) => setSelectedExecutive(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-500 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Sales Executive</option>
              <option value="John Smith">John Smith</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Michael Brown">Michael Brown</option>
              <option value="Emily Davis">Emily Davis</option>
              <option value="David Wilson">David Wilson</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedExecutive}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSalesExecutiveModal;