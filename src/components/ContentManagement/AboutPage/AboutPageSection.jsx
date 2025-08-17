import React, { useState } from 'react';
import CompanyInfo from './CompanyInfo';
import TeamSection from './TeamSection';
import MissionVision from './MissionVision';

const AboutPageSection = () => {
  const [activeSection, setActiveSection] = useState('company');

  const sections = [
    { id: 'company', name: 'Company Info', component: CompanyInfo },
    { id: 'team', name: 'Team Section', component: TeamSection },
    { id: 'mission', name: 'Mission & Vision', component: MissionVision }
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

export default AboutPageSection;
