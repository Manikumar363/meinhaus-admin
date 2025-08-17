import React, { useState } from 'react';
import ContactInfoSection from './ContactInfoSection';
import ContactFormSection from './ContactFormSection';
import LocationSection from './LocationSection';
import OfficeHoursSection from './OfficeHoursSection';

const ContactUsPageSection = () => {
  const [activeSection, setActiveSection] = useState('contact-info');

  const sections = [
    { id: 'contact-info', name: 'Contact Information', component: ContactInfoSection },
    { id: 'contact-form', name: 'Contact Form', component: ContactFormSection },
    { id: 'location', name: 'Location & Map', component: LocationSection },
    { id: 'office-hours', name: 'Office Hours', component: OfficeHoursSection }
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
        <h2 className="text-2xl font-bold text-gray-900">Contact Us Page Management</h2>
        <p className="text-gray-600 mt-1">Manage contact information, forms, location, and office hours</p>
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

export default ContactUsPageSection;
