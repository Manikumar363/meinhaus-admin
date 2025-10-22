import React, { useState } from 'react';

const AboutSection = () => {
  const [aboutContent, setAboutContent] = useState({
    title: 'About Us',
    subtitle: 'Why Choose MEINHAUS',
    description: 'We are a leading general contractor company with years of experience in delivering quality construction projects.',
    imageUrl: '/about-image.jpg',
    points: [
      'Professional Team',
      'Quality Materials',
      'Timely Delivery',
      'Competitive Pricing'
    ]
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving about section:', aboutContent);
    alert('About section saved successfully!');
  };

  const addPoint = () => {
    setAboutContent({
      ...aboutContent,
      points: [...aboutContent.points, '']
    });
  };

  const removePoint = (index) => {
    const newPoints = aboutContent.points.filter((_, i) => i !== index);
    setAboutContent({
      ...aboutContent,
      points: newPoints
    });
  };

  const updatePoint = (index, value) => {
    const newPoints = [...aboutContent.points];
    newPoints[index] = value;
    setAboutContent({
      ...aboutContent,
      points: newPoints
    });
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={aboutContent.title}
            onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={aboutContent.subtitle}
            onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section subtitle"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={aboutContent.description}
          onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter section description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Points</label>
        <div className="space-y-3">
          {aboutContent.points.map((point, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={point}
                onChange={(e) => updatePoint(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Point ${index + 1}`}
              />
              <button
                onClick={() => removePoint(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={addPoint}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Point</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
        <input
          type="text"
          value={aboutContent.imageUrl}
          onChange={(e) => setAboutContent({...aboutContent, imageUrl: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter image URL"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Image Left, Text Right</option>
          <option>Image Right, Text Left</option>
          <option>Image Top, Text Bottom</option>
          <option>Text Only</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Animation Type</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Fade In</option>
          <option>Slide Up</option>
          <option>Zoom In</option>
          <option>None</option>
        </select>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-700">Show statistics counter</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
        <p className="text-gray-600 mt-1">Manage the about section of your homepage</p>
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
          Save About Section
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
