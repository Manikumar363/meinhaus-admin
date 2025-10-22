import React, { useState } from "react";
import { UploadIcon } from "../ui/icons";

const EditEstimate = ({ onBack, estimate }) => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Flooring tile Services",
      status: "Requested",
      statusColor: "bg-orange-100 text-orange-600",
      serviceName: "Flooring and Tile Services",
      amount: "",
      registrationAmount: "",
      description: "",
      professionalDescription: "",
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center"
      ]
    },
    {
      id: 2,
      name: "Appliance Install",
      status: "Paid",
      statusColor: "bg-green-100 text-green-600",
      serviceName: "Flooring and Tile Services",
      amount: "",
      registrationAmount: "",
      description: "",
      professionalDescription: "",
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=100&h=100&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center"
      ]
    }
  ]);

  const removeService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const removeImage = (serviceId, imageIndex) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          images: service.images.filter((_, index) => index !== imageIndex)
        };
      }
      return service;
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-1">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="text-gray-600">Edit Estimates / </span>
          <span className="text-black font-medium">#OD653DT6</span>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          {/* Convert to Estimate Button */}
          <div className="mb-6">
            <button className=" text-black font-bold flex items-center gap-2">
              Convert to Estimate
            </button>
          </div>

          {/* Project Details Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input 
                  type="text" 
                  defaultValue="Home Painting"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Total Cost</label>
                <input 
                  type="text" 
                  defaultValue="$ 6543"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  defaultValue="Flooring and tile services lorem ipsum"
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700 resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input 
                  type="text" 
                  defaultValue="James Robert"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number (will be used for estimate)</label>
                <input 
                  type="text" 
                  placeholder="Enter Contact Number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea 
                  placeholder="Enter Address"
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                />
              </div>
            </div>
          </div>

          {/* NOTE Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="text-sm font-medium text-gray-700 mb-2">NOTE:</div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Please modify the amount-related information <span className="text-orange-600 font-medium">only if the user has not yet paid for the project.</span></li>
              <li>• You can change the amount whether the registration fee is paid or not.</li>
              <li>• Adjust the registration amount <span className="text-orange-600 font-medium">only if it has not been paid already.</span></li>
              <li>• <span className="text-orange-600 font-medium">Do not alter the amount</span> if it has already been fully or partially paid.</li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                {/* Service Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${service.statusColor}`}>
                      {service.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>

                {/* Service Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                      <input 
                        type="text" 
                        defaultValue={service.serviceName}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Amount</label>
                      <input 
                        type="text" 
                        placeholder="Enter Registration Amount"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Description</label>
                      <textarea 
                        placeholder="Enter Professional Description"
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input 
                        type="text" 
                        placeholder="Enter Amount"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        placeholder="Enter Description"
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                      <div className="flex items-center gap-3 mb-3">
                        {service.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative w-12 h-12">
                            <img 
                              src={image}
                              alt={`Service ${imageIndex + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button 
                              onClick={() => removeImage(service.id, imageIndex)}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="border border-gray-800 font-semibold rounded-lg px-3 py-2 text-gray-800 flex items-center gap-2 hover:bg-gray-50">
                        <UploadIcon className="w-5 h-5" />
                        Choose Images
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={onBack}
              className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onBack}
              className="bg-gray-800 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEstimate;