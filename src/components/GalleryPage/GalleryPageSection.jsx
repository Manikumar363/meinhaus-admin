import React, { useState } from 'react';
import PhotoGallerySection from './PhotoGallerySection';
import VideoGallerySection from './VideoGallerySection';

const GalleryPageSection = () => {
  const [activeSection, setActiveSection] = useState('photo-gallery');

  const sections = [
    { id: 'photo-gallery', name: 'Photo Gallery', component: PhotoGallerySection },
    { id: 'video-gallery', name: 'Video Gallery', component: VideoGallerySection },
  ];

  const renderActiveSection = () => {
    const section = sections.find(s => s.id === activeSection);
    if (section && section.component) {
      const Component = section.component;
      return <Component />;
    }
    return <div>Section not found</div>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Page Management</h2>
        <p className="text-gray-600 mt-1">Manage photo galleries, videos, portfolio, and gallery settings</p>
      </div>

      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="py-4">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default GalleryPageSection;
