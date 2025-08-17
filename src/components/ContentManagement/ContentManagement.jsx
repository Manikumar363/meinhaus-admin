import React, { useState } from 'react';
import HomePageSection from './HomePage/HomePageSection';
import AboutPageSection from './AboutPage/AboutPageSection';
import EducationPageSection from './EducationPage/EducationPageSection';
import ContactUsPageSection from './ContactUs/ContactUsPageSection';
import GalleryPageSection from './GalleryPage/GalleryPageSection';

const ContentManagement = () => {
  const [activeSection, setActiveSection] = useState('home');

  const contentSections = [
    { id: 'home', name: 'Home Page', component: HomePageSection },
    { id: 'about', name: 'About Page', component: AboutPageSection },
    { id: 'education', name: 'Education Page', component: EducationPageSection },
    { id: 'contact', name: 'Contact Page', component: ContactUsPageSection },
    { id: 'gallery', name: 'Gallery Page', component: GalleryPageSection },
  ];

  const renderContent = () => {
    const section = contentSections.find(s => s.id === activeSection);
    
    if (!section || !section.component) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{section?.name} Management</h3>
            <p className="text-gray-500">This section is coming soon!</p>
          </div>
        </div>
      );
    }

    const Component = section.component;
    return <Component />;
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {contentSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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

      {/* Content Area */}
      <div className="py-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentManagement;
