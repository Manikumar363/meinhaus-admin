import React, { useState } from 'react';

const ComplimentarySection = () => {
  const [complimentaryContent, setComplimentaryContent] = useState({
    title: 'Complimentary Services',
    subtitle: 'Additional services to enhance your experience',
    services: [
      {
        id: 1,
        name: 'Lending Services',
        description: 'Professional lending and financing solutions for your construction projects',
        imageUrl: '/lending-services.jpg',
        isActive: true
      },
      {
        id: 2,
        name: 'Consultation',
        description: 'Expert consultation and project planning services',
        imageUrl: '/consultation.jpg',
        isActive: true
      },
      {
        id: 3,
        name: 'Project Management',
        description: 'Comprehensive project management and oversight',
        imageUrl: '/project-management.jpg',
        isActive: true
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving complimentary services section:', complimentaryContent);
    alert('Complimentary services section saved successfully!');
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: '',
      description: '',
      imageUrl: '',
      isActive: true
    };
    setComplimentaryContent({
      ...complimentaryContent,
      services: [...complimentaryContent.services, newService]
    });
  };

  const removeService = (serviceId) => {
    const newServices = complimentaryContent.services.filter(service => service.id !== serviceId);
    setComplimentaryContent({
      ...complimentaryContent,
      services: newServices
    });
  };

  const updateService = (serviceId, field, value) => {
    const newServices = complimentaryContent.services.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    setComplimentaryContent({
      ...complimentaryContent,
      services: newServices
    });
  };

  const toggleActive = (serviceId) => {
    const newServices = complimentaryContent.services.map(service => 
      service.id === serviceId ? { ...service, isActive: !service.isActive } : service
    );
    setComplimentaryContent({
      ...complimentaryContent,
      services: newServices
    });
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={complimentaryContent.title}
            onChange={(e) => setComplimentaryContent({...complimentaryContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={complimentaryContent.subtitle}
            onChange={(e) => setComplimentaryContent({...complimentaryContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section subtitle"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Complimentary Services</label>
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
          {complimentaryContent.services.map((service, index) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Service {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleActive(service.id)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => removeService(service.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => updateService(service.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter service description"
                  />
                </div>
              </div>
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
        <div className="space-y-4">
          {complimentaryContent.services.map((service, index) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-medium text-gray-700">Service {index + 1}: {service.name}</span>
                {service.isActive && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">Active</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={service.imageUrl}
                    onChange={(e) => updateService(service.id, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-xs text-gray-500">Upload image</p>
                  </div>
                </div>
                
                {service.imageUrl && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Image Preview</label>
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span className="text-gray-500 text-sm">Image not found</span>
                    </div>
                  </div>
                )}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Services per Row</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Services to Show</label>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show service descriptions</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Enable hover effects</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show service icons</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Enable click to expand</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Complimentary Services</h2>
        <p className="text-gray-600 mt-1">Manage the complimentary services section of your homepage</p>
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
          Save Complimentary Services Section
        </button>
      </div>
    </div>
  );
};

export default ComplimentarySection;
