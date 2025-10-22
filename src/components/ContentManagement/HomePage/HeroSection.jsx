import React, { useState } from 'react';

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Welcome to MEINHAUS',
    subtitle: 'Your Trusted General Contractor',
    description: 'Professional construction and renovation services for your home and business needs.',
    buttonText: 'Get Started',
    buttonLink: '/contact',
    imageUrl: '/hero-image.jpg'
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving hero section:', heroContent);
    alert('Hero section saved successfully!');
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={heroContent.title}
            onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
          <input
            type="text"
            value={heroContent.subtitle}
            onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero subtitle"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
        <textarea
          value={heroContent.description}
          onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter hero description"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={heroContent.buttonText}
            onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter button text"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={heroContent.buttonLink}
            onChange={(e) => setHeroContent({...heroContent, buttonLink: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter button link"
          />
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
        <input
          type="text"
          value={heroContent.imageUrl}
          onChange={(e) => setHeroContent({...heroContent, imageUrl: e.target.value})}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Animation Type</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Fade In</option>
          <option>Slide Up</option>
          <option>Zoom In</option>
          <option>None</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Left</option>
          <option>Center</option>
          <option>Right</option>
        </select>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-700">Enable parallax effect</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
        <p className="text-gray-600 mt-1">Manage the main hero section of your homepage</p>
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
          Save Hero Section
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
