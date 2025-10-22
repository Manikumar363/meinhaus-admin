import React, { useState } from 'react';

const ServicesSection = () => {
  const [servicesContent, setServicesContent] = useState({
    title: 'Our Services',
    subtitle: 'What We Offer',
    description: 'Comprehensive construction and renovation services for residential and commercial projects.',
    services: [
      { 
        name: 'Home Renovation', 
        description: 'Complete home renovation and remodeling services',
        icon: '🏠',
        imageUrl: '/service-1.jpg'
      },
      { 
        name: 'Commercial Construction', 
        description: 'Commercial building construction and renovation',
        icon: '🏢',
        imageUrl: '/service-2.jpg'
      },
      { 
        name: 'Kitchen & Bath', 
        description: 'Specialized kitchen and bathroom remodeling',
        icon: '🚿',
        imageUrl: '/service-3.jpg'
      },
      { 
        name: 'Exterior Work', 
        description: 'Siding, roofing, and exterior improvements',
        icon: '🏗️',
        imageUrl: '/service-4.jpg'
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [editingService, setEditingService] = useState(null);

  const handleSave = () => {
    console.log('Saving services section:', servicesContent);
    alert('Services section saved successfully!');
  };

  const addService = () => {
    const newService = {
      name: '',
      description: '',
      icon: '🔧',
      imageUrl: ''
    };
    setServicesContent({
      ...servicesContent,
      services: [...servicesContent.services, newService]
    });
    setEditingService(servicesContent.services.length);
  };

  const removeService = (index) => {
    const newServices = servicesContent.services.filter((_, i) => i !== index);
    setServicesContent({
      ...servicesContent,
      services: newServices
    });
  };

  const updateService = (index, field, value) => {
    const newServices = [...servicesContent.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServicesContent({
      ...servicesContent,
      services: newServices
    });
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={servicesContent.title}
            onChange={(e) => setServicesContent({...servicesContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={servicesContent.subtitle}
            onChange={(e) => setServicesContent({...servicesContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section subtitle"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
        <textarea
          value={servicesContent.description}
          onChange={(e) => setServicesContent({...servicesContent, description: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter section description"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Services</label>
          <button
            onClick={addService}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Service</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {servicesContent.services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => updateService(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter service description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <input
                    type="text"
                    value={service.icon}
                    onChange={(e) => updateService(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter emoji or icon"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setEditingService(editingService === index ? null : index)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {editingService === index ? 'Hide Details' : 'Show Details'}
                </button>
                <button
                  onClick={() => removeService(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Service
                </button>
              </div>
              
              {editingService === index && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Image URL</label>
                  <input
                    type="text"
                    value={service.imageUrl}
                    onChange={(e) => updateService(index, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Images</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {servicesContent.services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{service.icon}</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={service.imageUrl}
                  onChange={(e) => updateService(index, 'imageUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-xs text-gray-500">Upload image</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Grid Layout</option>
          <option>List Layout</option>
          <option>Card Layout</option>
          <option>Masonry Layout</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Columns per Row</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-700">Show service icons</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-700">Enable hover effects</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Services Section</h2>
        <p className="text-gray-600 mt-1">Manage the services section of your homepage</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'content', name: 'Content' },
            { id: 'media', name: 'Media' },
            { id: 'settings', name: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'media' && renderMediaTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>

      {/* Save Button */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Services Section
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
