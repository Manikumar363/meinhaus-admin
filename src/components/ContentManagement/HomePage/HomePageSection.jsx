import React, { useState } from 'react';
import SliderSection from '../SliderSection/SliderSection';


const HomePageSection = () => {
  const [activeSection, setActiveSection] = useState('slider');

  const sections = [
    { id: 'slider', name: 'Slider Section', component: SliderSection },
  ];

  const renderSection = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;

    const Component = section.component;
    return <Component />;
  };

  return (
    <div className="space-y-6">
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
        {renderSection()}
      </div>
    </div>
  );
};

export default HomePageSection;
