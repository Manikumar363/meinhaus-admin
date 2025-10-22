import React, { useState } from 'react';

const HomePageSection = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [heroTitle, setHeroTitle] = useState('Welcome to MEINHAUS');
  const [heroSubtitle, setHeroSubtitle] = useState('Your Trusted General Contractor');
  const [heroDescription, setHeroDescription] = useState('Professional construction and renovation services for your home and business needs.');
  const [heroButtonText, setHeroButtonText] = useState('Get Started');
  const [heroButtonLink, setHeroButtonLink] = useState('/contact');

  const [aboutTitle, setAboutTitle] = useState('About Us');
  const [aboutDescription, setAboutDescription] = useState('We are a leading general contractor company with years of experience in delivering quality construction projects.');
  const [aboutPoints, setAboutPoints] = useState([
    'Professional Team',
    'Quality Materials',
    'Timely Delivery',
    'Competitive Pricing'
  ]);

  const [servicesTitle, setServicesTitle] = useState('Our Services');
  const [services, setServices] = useState([
    { name: 'Home Renovation', description: 'Complete home renovation and remodeling services' },
    { name: 'Commercial Construction', description: 'Commercial building construction and renovation' },
    { name: 'Kitchen & Bath', description: 'Specialized kitchen and bathroom remodeling' },
    { name: 'Exterior Work', description: 'Siding, roofing, and exterior improvements' }
  ]);

  const handleSave = (section) => {
    // Here you would typically send the data to your backend
    console.log(`Saving ${section} section:`, {
      hero: { heroTitle, heroSubtitle, heroDescription, heroButtonText, heroButtonLink },
      about: { aboutTitle, aboutDescription, aboutPoints },
      services: { servicesTitle, services }
    });
    
    // Show success message (you can implement a toast notification here)
    alert(`${section} section saved successfully!`);
  };

  const renderHeroSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
          <input
            type="text"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
        <textarea
          value={heroDescription}
          onChange={(e) => setHeroDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={heroButtonText}
            onChange={(e) => setHeroButtonText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={heroButtonLink}
            onChange={(e) => setHeroButtonLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={() => handleSave('hero')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Hero Section
      </button>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">About Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={aboutTitle}
          onChange={(e) => setAboutTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={aboutDescription}
          onChange={(e) => setAboutDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Points</label>
        <div className="space-y-2">
          {aboutPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={point}
                onChange={(e) => {
                  const newPoints = [...aboutPoints];
                  newPoints[index] = e.target.value;
                  setAboutPoints(newPoints);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  const newPoints = aboutPoints.filter((_, i) => i !== index);
                  setAboutPoints(newPoints);
                }}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setAboutPoints([...aboutPoints, ''])}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Point
          </button>
        </div>
      </div>

      <button
        onClick={() => handleSave('about')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save About Section
      </button>
    </div>
  );

  const renderServicesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Services Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={servicesTitle}
          onChange={(e) => setServicesTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].name = e.target.value;
                      setServices(newServices);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...services];
                      newServices[index].description = e.target.value;
                      setServices(newServices);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  const newServices = services.filter((_, i) => i !== index);
                  setServices(newServices);
                }}
                className="mt-2 text-red-600 hover:text-red-800 text-sm"
              >
                Remove Service
              </button>
            </div>
          ))}
          <button
            onClick={() => setServices([...services, { name: '', description: '' }])}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Service
          </button>
        </div>
      </div>

      <button
        onClick={() => handleSave('services')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Services Section
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'hero', name: 'Hero Section' },
            { id: 'about', name: 'About Section' },
            { id: 'services', name: 'Services Section' }
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

      <div className="py-4">
        {activeTab === 'hero' && renderHeroSection()}
        {activeTab === 'about' && renderAboutSection()}
        {activeTab === 'services' && renderServicesSection()}
      </div>
    </div>
  );
};

export default HomePageSection;
