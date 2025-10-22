import React, { useState } from 'react';
import HomePageSection from './HomePage/HomePageSection';
import ArticlesSection from '../ContentManagement/ArticleSection/ArticlesSection';
import TestimonialsSection from '../ContentManagement/ClientTestimonials/TestimonialsSection';
import ComplimentarySection from '../ContentManagement/ComplimentaryServices/ComplimentarySection';

const sections = [
  { id: 'home', label: 'Home Page', component: HomePageSection },
  { id: 'articles', label: 'Articles', component: ArticlesSection },
  { id: 'testimonials', label: 'Testimonials', component: TestimonialsSection },
  { id: 'complimentary', label: 'Complimentary', component: ComplimentarySection },
];

const ContentManagement = () => {
  const [activeSection, setActiveSection] = useState('home');

  const SectionComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="py-4">
        {SectionComponent && <SectionComponent />}
      </div>
    </div>
  );
};

export default ContentManagement;
