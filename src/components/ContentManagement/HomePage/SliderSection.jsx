import React, { useState } from 'react';

const SliderSection = () => {
  const [sliderContent, setSliderContent] = useState({
    title: 'Your Space with Expert Services!',
    subtitle: 'Transform your space with our professional construction services',
    buttonText: 'Get Started',
    buttonLink: '/contact',
    slides: [
      {
        id: 1,
        title: 'Slider One',
        subtitle: 'Professional Construction Services',
        description: 'Transform your space with our expert team',
        imageUrl: '/slider-1.jpg',
        isActive: true
      },
      {
        id: 2,
        title: 'Slider Two',
        subtitle: 'Quality Renovation',
        description: 'Bring your vision to life with our services',
        imageUrl: '/slider-2.jpg',
        isActive: false
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');
  const [editingSlide, setEditingSlide] = useState(null);

  const handleSave = () => {
    console.log('Saving slider section:', sliderContent);
    alert('Slider section saved successfully!');
  };

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      isActive: false
    };
    setSliderContent({
      ...sliderContent,
      slides: [...sliderContent.slides, newSlide]
    });
  };

  const removeSlide = (slideId) => {
    const newSlides = sliderContent.slides.filter(slide => slide.id !== slideId);
    setSliderContent({
      ...sliderContent,
      slides: newSlides
    });
  };

  const updateSlide = (slideId, field, value) => {
    const newSlides = sliderContent.slides.map(slide => 
      slide.id === slideId ? { ...slide, [field]: value } : slide
    );
    setSliderContent({
      ...sliderContent,
      slides: newSlides
    });
  };

  const setActiveSlide = (slideId) => {
    const newSlides = sliderContent.slides.map(slide => ({
      ...slide,
      isActive: slide.id === slideId
    }));
    setSliderContent({
      ...sliderContent,
      slides: newSlides
    });
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
          <input
            type="text"
            value={sliderContent.title}
            onChange={(e) => setSliderContent({...sliderContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter main slider title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={sliderContent.subtitle}
            onChange={(e) => setSliderContent({...sliderContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subtitle"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={sliderContent.buttonText}
            onChange={(e) => setSliderContent({...sliderContent, buttonText: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter button text"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={sliderContent.buttonLink}
            onChange={(e) => setSliderContent({...sliderContent, buttonLink: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter button link"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Slider Images</label>
          <button
            onClick={addSlide}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Slide</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {sliderContent.slides.map((slide, index) => (
            <div key={slide.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Slide {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveSlide(slide.id)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      slide.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {slide.isActive ? 'Active' : 'Set Active'}
                  </button>
                  <button
                    onClick={() => removeSlide(slide.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slide Title</label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter slide title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slide Subtitle</label>
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter slide subtitle"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={slide.description}
                  onChange={(e) => updateSlide(slide.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter slide description"
                />
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Slider Images</h3>
        <div className="space-y-4">
          {sliderContent.slides.map((slide, index) => (
            <div key={slide.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-medium text-gray-700">Slide {index + 1}: {slide.title}</span>
                {slide.isActive && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">Active</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={slide.imageUrl}
                    onChange={(e) => updateSlide(slide.id, 'imageUrl', e.target.value)}
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
                
                {slide.imageUrl && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Image Preview</label>
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={slide.imageUrl} 
                        alt={slide.title}
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Animation Type</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Fade</option>
          <option>Slide</option>
          <option>Zoom</option>
          <option>None</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Auto-play Speed (seconds)</label>
        <input
          type="number"
          min="1"
          max="10"
          defaultValue="5"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Enable auto-play</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show navigation arrows</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show pagination dots</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Slider Section</h2>
        <p className="text-gray-600 mt-1">Manage the main slider section of your homepage</p>
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
          Save Slider Section
        </button>
      </div>
    </div>
  );
};

export default SliderSection;
