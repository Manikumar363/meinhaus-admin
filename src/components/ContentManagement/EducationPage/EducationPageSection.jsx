import React, { useState } from 'react';
import CourseSection from './CourseSection';
import FacultySection from './FacultySection';
import ProgramsSection from './ProgramsSection';
import ResourcesSection from './ResourcesSection';

const EducationPageSection = () => {
  const [activeSection, setActiveSection] = useState('courses');

  const sections = [
    { id: 'courses', name: 'Courses', component: CourseSection },
    { id: 'faculty', name: 'Faculty', component: FacultySection },
    { id: 'programs', name: 'Programs', component: ProgramsSection },
    { id: 'resources', name: 'Resources', component: ResourcesSection }
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
        <h2 className="text-2xl font-bold text-gray-900">Education Page Management</h2>
        <p className="text-gray-600 mt-1">Manage educational content, courses, faculty, and programs</p>
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

export default EducationPageSection;
