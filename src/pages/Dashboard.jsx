import React, { useState } from 'react';
import ArticlesSection from '../components/ContentManagement/ArticleSection/ArticlesSection';
import TestimonialsSection from '../components/ContentManagement/ClientTestimonials/TestimonialsSection';
import ComplimentarySection from '../components/ContentManagement/ComplimentaryServices/ComplimentarySection';
import SliderSection from '../components/ContentManagement/SliderSection/SliderSection';
import AboutSection from '../components/AboutPage/AboutPageSection';
import ContactUsSection from '../components/ContactUs/ContactUsPageSection';
import EducationSection from '../components/EducationPage/EducationPageSection';
import GallerySection from '../components/GalleryPage/GalleryPageSection';
import ComplimentaryServicePage from '../components/ComplimentaryServiceRequest/ComplimentaryServicePage';
import QueryPage from '../components/Query/QueryPageSection';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('content'); // default to content
  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [activeContentPage, setActiveContentPage] = useState('slider');

  // Content Management subpages
  const contentPages = [
    { id: 'slider', label: 'Slider Section', component: <SliderSection /> },
    { id: 'articles', label: 'Articles Section', component: <ArticlesSection /> },
    { id: 'testimonials', label: 'Client Testimonials', component: <TestimonialsSection /> },
    { id: 'complimentary', label: 'Complimentary Services', component: <ComplimentarySection /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
        {/* Logo and Branding */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img 
              src="/main-logo.png" 
              alt="MEINHAUS Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 mt-4">
          <div className="px-4 h-full flex flex-col">
            {/* Dashboard */}
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('dashboard');
                setShowContentDropdown(false);
              }}
            >
              <span>Dashboard</span>
            </div>
            {/* Content Management with Dropdown */}
            <div>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                  activeMenu === 'content' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveMenu('content');
                  setShowContentDropdown(!showContentDropdown);
                }}
              >
                <span>Content Management</span>
                <span>{showContentDropdown ? '▲' : '▼'}</span>
              </div>
              {showContentDropdown && (
                <div className="ml-4">
                  {contentPages.map(page => (
                    <div
                      key={page.id}
                      className={`px-3 py-2 rounded-lg cursor-pointer mb-1 text-sm ${
                        activeContentPage === page.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-600'
                      }`}
                      onClick={() => {
                        setActiveMenu('content');
                        setActiveContentPage(page.id);
                      }}
                    >
                      {page.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Other Sections */}
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'about' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('about');
                setShowContentDropdown(false);
              }}
            >
              <span>About Section</span>
            </div>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'contact' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('contact');
                setShowContentDropdown(false);
              }}
            >
              <span>ContactUs Section</span>
            </div>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'education' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('education');
                setShowContentDropdown(false);
              }}
            >
              <span>Education Section</span>
            </div>
            <div 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'gallery' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('gallery');
                setShowContentDropdown(false);
              }}
            >
              <span>Gallery Section</span>
            </div>
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'complimentaryService' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('complimentaryService');
                setShowContentDropdown(false);
              }}
            >
              <span>Complimentary Service</span>
            </div>
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'query' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('query');
                setShowContentDropdown(false);
              }}
            >
              <span>Query</span>
            </div>
            <div className="flex-1"></div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* WiFi Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">10</span>
              </div>

              {/* Chat Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
              </div>

              {/* Bell Icon */}
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 2.17a4 4 0 00-5.66 5.66l1.34 1.34m0 0l2.83 2.83 1.34-1.34m2.83-2.83L7.17 9.16M9 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">12</span>
              </div>

              {/* User Profile */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeMenu === 'content' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Only show selected content page */}
              {contentPages.find(page => page.id === activeContentPage)?.component}
            </div>
          )}
          {activeMenu === 'about' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <AboutSection />
            </div>
          )}
          {activeMenu === 'contact' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ContactUsSection />
            </div>
          )}
          {activeMenu === 'education' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <EducationSection />
            </div>
          )}
          {activeMenu === 'gallery' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <GallerySection />
            </div>
          )}
          {activeMenu === 'complimentaryService' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ComplimentaryServicePage />
            </div>
          )}
          {activeMenu === 'query' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <QueryPage />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
