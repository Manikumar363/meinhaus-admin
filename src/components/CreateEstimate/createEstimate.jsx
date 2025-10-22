import React, { useState } from "react";

const CreateEstimate = () => {
  const [formData, setFormData] = useState({
    estimateType: "new",
    customerType: "new",
    draftName: "",
    existingCustomer: "",
    fullName: "",
    email: "",
    phone: "",
    addressType: "new",
    address: "",
    coordinates: "",
    title: "",
    description: "",
    paymentNumber: 1,
    autoDivide: false,
    serviceName: "",
    amount: "",
    registrationAmount: "",
    serviceDescription: "",
    professionalDescription: "",
  });

  const [services, setServices] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      serviceName: formData.serviceName,
      amount: formData.amount,
      registrationAmount: formData.registrationAmount,
      description: formData.serviceDescription,
      professionalDescription: formData.professionalDescription,
    };
    setServices([...services, newService]);

    // Reset service fields
    setFormData((prev) => ({
      ...prev,
      serviceName: "",
      amount: "",
      registrationAmount: "",
      serviceDescription: "",
      professionalDescription: "",
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Services:", services);
    // Handle form submission
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-1">
        {/* Header with inline checkboxes */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-black">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Create Estimate
            </h1>
          </div>

          {/* Checkboxes aligned inline with header */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="createNewEstimate"
                checked={formData.estimateType === "new"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({ ...prev, estimateType: "new" }));
                  }
                }}
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
              />
              <span className="text-gray-700">Create New Estimate</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="draftEstimate"
                checked={formData.estimateType === "draft"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({ ...prev, estimateType: "draft" }));
                  }
                }}
                className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
              />
              <span className="text-gray-700">Draft Estimate</span>
            </label>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-48 bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div className="text-gray-600 font-medium pb-2 border-b border-gray-200">
                Customer Details
              </div>
              <div className="text-gray-600 font-medium pb-2 border-b border-gray-200">
                Project Details
              </div>
              <div className="text-gray-600 font-medium pb-2">Services</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Customer Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Details
                </h2>

                {/* Draft Name for Draft Estimate */}
                {formData.estimateType === "draft" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Draft Name (for your reference only)
                    </label>
                    <input
                      type="text"
                      name="draftName"
                      value={formData.draftName}
                      onChange={handleInputChange}
                      placeholder="Give this draft a name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>
                )}

                {/* Customer Type */}
                <div className="flex gap-4 mb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="createNewCustomer"
                      checked={formData.customerType === "new"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            customerType: "new",
                          }));
                        }
                      }}
                      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span className="text-gray-700">Create New Customer</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="existingCustomer"
                      checked={formData.customerType === "existing"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            customerType: "existing",
                          }));
                        }
                      }}
                      className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span className="text-gray-700">Existing Customer</span>
                  </label>
                </div>

                {/* Existing Customer Dropdown */}
                {formData.customerType === "existing" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Customer
                    </label>
                    <select
                      name="existingCustomer"
                      value={formData.existingCustomer}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    >
                      <option value="">Select existing customer</option>
                      <option value="james-robert">James Robert</option>
                      <option value="john-doe">John Doe</option>
                      <option value="jane-smith">Jane Smith</option>
                    </select>
                  </div>
                )}

                {formData.customerType === "new" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={
                          formData.estimateType === "draft"
                            ? "James Robert"
                            : "Enter full name"
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail ID
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={
                          formData.estimateType === "draft"
                            ? "jamesrobert@gmail.com"
                            : "Enter e-mail id"
                        }
                        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                          +1
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={
                            formData.estimateType === "draft"
                              ? "7867867862"
                              : "Enter phone number"
                          }
                          className="flex-1 px-3 py-3 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Section */}
                <div className="mt-6">
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="addNewAddress"
                        checked={formData.addressType === "new"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              addressType: "new",
                            }));
                          }
                        }}
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-gray-700">Add New Address</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="chooseAddress"
                        checked={formData.addressType === "choose"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              addressType: "choose",
                            }));
                          }
                        }}
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-gray-700">Choose Address</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      {formData.addressType === "choose" ? (
                        <select
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        >
                          <option value="">Select Address</option>
                          <option value="123 Main St, Toronto, ON">
                            123 Main St, Toronto, ON
                          </option>
                          <option value="456 Oak Ave, Vancouver, BC">
                            456 Oak Ave, Vancouver, BC
                          </option>
                          <option value="789 Pine Rd, Calgary, AB">
                            789 Pine Rd, Calgary, AB
                          </option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter a location (Restricted to Canada)"
                          className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coordinates
                      </label>
                      <input
                        type="text"
                        name="coordinates"
                        value={formData.coordinates}
                        onChange={handleInputChange}
                        placeholder="0, 0"
                        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Project Details
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Home Painting"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      rows={4}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Payment
                      </label>
                      <select
                        name="paymentNumber"
                        value={formData.paymentNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="autoDivide"
                        checked={formData.autoDivide}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-gray-700">Auto Divide</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Details Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Service Details
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name
                    </label>
                    <select
                      name="serviceName"
                      value={formData.serviceName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    >
                      <option value="">Select Service</option>
                      <option value="appliance-install">
                        Appliance Install
                      </option>
                      <option value="home-painting">Home Painting</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter Amount"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Amount
                    </label>
                    <input
                      type="number"
                      name="registrationAmount"
                      value={formData.registrationAmount}
                      onChange={handleInputChange}
                      placeholder="Enter Registration Amount"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="serviceDescription"
                      value={formData.serviceDescription}
                      onChange={handleInputChange}
                      placeholder="Enter Description"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Description
                    </label>
                    <textarea
                      name="professionalDescription"
                      value={formData.professionalDescription}
                      onChange={handleInputChange}
                      placeholder="Enter Professional Description"
                      rows={3}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Add Service Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span className="text-lg">+</span>
                    Add Service
                  </button>
                </div>

                {/* Services List */}
                {services.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Added Services
                    </h3>
                    <div className="space-y-3">
                      {services.map((service, index) => (
                        <div
                          key={service.id}
                          className="p-4 border border-gray-200 rounded-md bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {service.serviceName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Amount: ${service.amount}
                              </p>
                              <p className="text-sm text-gray-600">
                                Registration: ${service.registrationAmount}
                              </p>
                              {service.description && (
                                <p className="text-sm text-gray-600 mt-2">
                                  {service.description}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setServices(
                                  services.filter((s) => s.id !== service.id)
                                )
                              }
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4">
                {formData.estimateType === "draft" && (
                  <button
                    type="button"
                    onClick={() => console.log("Save as Draft")}
                    className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium"
                  >
                    Save as Draft
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium"
                >
                  Convert to estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEstimate;
