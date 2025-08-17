import React, { useState } from 'react';

const TestimonialsSection = () => {
  const [testimonialsContent, setTestimonialsContent] = useState({
    title: 'What Clients Are Saying',
    subtitle: 'Hear from our satisfied customers',
    testimonials: [
      {
        id: 1,
        name: 'Shad Kramer',
        rating: 5,
        quote: 'Velit debitis repell',
        description: 'Error quis ut distin\nNihil exercitation q',
        isActive: true
      },
      {
        id: 2,
        name: 'Jayme Rosales',
        rating: 2,
        quote: 'In porro voluptatem',
        description: 'Enim ex at adipisici\nQuibusdam soluta ex',
        isActive: true
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving testimonials section:', testimonialsContent);
    alert('Testimonials section saved successfully!');
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      rating: 5,
      quote: '',
      description: '',
      isActive: true
    };
    setTestimonialsContent({
      ...testimonialsContent,
      testimonials: [...testimonialsContent.testimonials, newTestimonial]
    });
  };

  const removeTestimonial = (testimonialId) => {
    const newTestimonials = testimonialsContent.testimonials.filter(testimonial => testimonial.id !== testimonialId);
    setTestimonialsContent({
      ...testimonialsContent,
      testimonials: newTestimonials
    });
  };

  const updateTestimonial = (testimonialId, field, value) => {
    const newTestimonials = testimonialsContent.testimonials.map(testimonial => 
      testimonial.id === testimonialId ? { ...testimonial, [field]: value } : testimonial
    );
    setTestimonialsContent({
      ...testimonialsContent,
      testimonials: newTestimonials
    });
  };

  const toggleActive = (testimonialId) => {
    const newTestimonials = testimonialsContent.testimonials.map(testimonial => 
      testimonial.id === testimonialId ? { ...testimonial, isActive: !testimonial.isActive } : testimonial
    );
    setTestimonialsContent({
      ...testimonialsContent,
      testimonials: newTestimonials
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-orange-500 fill-current' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={testimonialsContent.title}
            onChange={(e) => setTestimonialsContent({...testimonialsContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={testimonialsContent.subtitle}
            onChange={(e) => setTestimonialsContent({...testimonialsContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section subtitle"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Client Testimonials</label>
          <button
            onClick={addTestimonial}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Testimonial</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {testimonialsContent.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Testimonial {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleActive(testimonial.id)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      testimonial.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => removeTestimonial(testimonial.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={testimonial.rating}
                    onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                <input
                  type="text"
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(testimonial.id, 'quote', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter testimonial quote"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={testimonial.description}
                  onChange={(e) => updateTestimonial(testimonial.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter testimonial description"
                />
                <p className="text-xs text-gray-500 mt-1">Use \n for line breaks</p>
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating Preview</label>
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Testimonial Images</h3>
        <div className="space-y-4">
          {testimonialsContent.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-medium text-gray-700">Testimonial {index + 1}: {testimonial.name}</span>
                {testimonial.isActive && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">Active</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Photo URL (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client photo URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Client Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-xs text-gray-500">Upload photo</p>
                  </div>
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
          <option>Carousel Layout</option>
          <option>Masonry Layout</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials per Row</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Testimonials to Show</label>
        <input
          type="number"
          min="1"
          max="20"
          defaultValue="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show star ratings</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show client photos</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Enable carousel navigation</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Auto-rotate testimonials</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Client Testimonials</h2>
        <p className="text-gray-600 mt-1">Manage the "What Clients Are Saying" section of your homepage</p>
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
          Save Testimonials Section
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
