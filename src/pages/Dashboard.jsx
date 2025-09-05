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
import LogoutButton from '../components/LogoutButton';
import ServiceSectionPage from '../components/ServicePage/serviceSectionPage';
import { Settings } from 'lucide-react'; 


// import icons (renamed to PascalCase where needed)
import {
  DashboardIcon,
  cmsIcon as CmsIcon,
  aboutIcon as AboutIcon,
  contactIcon as ContactIcon,
  educationIcon as EducationIcon,
  galleryIcon as GalleryIcon,
  complimentaryIcon as ComplimentaryIcon,
  slidericon as SliderIcon,
  articleIcon as ArticleIcon,
  testimonalsIcon as TestimonialsIcon,
  upArrowIcon as UpArrowIcon,
  downArrowIcon as DownArrowIcon,

} from '../components/ui/icons';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('content');
  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [activeContentPage, setActiveContentPage] = useState('slider');

  const contentPages = [
    { id: 'slider', label: 'Slider Section', icon: <SliderIcon className="w-3 h-3" />, component: <SliderSection /> },
    { id: 'articles', label: 'Articles Section', icon: <ArticleIcon className="w-3 h-3" />, component: <ArticlesSection /> },
    { id: 'testimonials', label: 'Client Testimonials', icon: <TestimonialsIcon className="w-3 h-3" />, component: <TestimonialsSection /> },
    { id: 'complimentary', label: 'Complimentary Services', icon: <ComplimentaryIcon className="w-3 h-3" />, component: <ComplimentarySection /> },
  ];

  // Pick the active component (single wrapper so it can stretch full height)
  let activeComponent = null;
  if (activeMenu === 'content') {
    activeComponent = contentPages.find(p => p.id === activeContentPage)?.component;
  } else if (activeMenu === 'about') activeComponent = <AboutSection />;
  else if (activeMenu === 'contact') activeComponent = <ContactUsSection />;
  else if (activeMenu === 'education') activeComponent = <EducationSection />;
  else if (activeMenu === 'gallery') activeComponent = <GallerySection />;
  else if (activeMenu === 'complimentaryService') activeComponent = <ComplimentaryServicePage />;
  else if (activeMenu === 'query') activeComponent = <QueryPage />;
  else if (activeMenu === 'services') activeComponent = <ServiceSectionPage />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="/main-logo.png"
              alt="MEINHAUS Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <nav className="flex-1 mt-4">
          <div className="px-4 h-full flex flex-col">
            {/* Dashboard */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'dashboard'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('dashboard');
                setShowContentDropdown(false);
              }}
            >
              <DashboardIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </div>

            {/* Content Management */}
            <div>
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                  activeMenu === 'content'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveMenu('content');
                  setShowContentDropdown(!showContentDropdown);
                }}
              >
                <div className="flex items-center space-x-3">
                  <CmsIcon className="w-5 h-5" />
                  <span>Content Management</span>
                </div>
                {showContentDropdown ? (
                  <UpArrowIcon className="w-4 h-4" />
                ) : (
                  <DownArrowIcon className="w-4 h-4" />
                )}
              </div>
              {showContentDropdown && (
                <div className="ml-4">
                  {contentPages.map((page) => (
                    <div
                      key={page.id}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer mb-1 text-sm ${
                        activeContentPage === page.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-blue-600'
                      }`}
                      onClick={() => {
                        setActiveMenu('content');
                        setActiveContentPage(page.id);
                      }}
                    >
                      {page.icon}
                      <span>{page.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'about'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('about');
                setShowContentDropdown(false);
              }}
            >
              <AboutIcon className="w-5 h-5" />
              <span>About Section</span>
            </div>

            {/* Contact */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'contact'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('contact');
                setShowContentDropdown(false);
              }}
            >
              <ContactIcon className="w-5 h-5" />
              <span>ContactUs Section</span>
            </div>

            {/* Education */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'education'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('education');
                setShowContentDropdown(false);
              }}
            >
              <EducationIcon className="w-5 h-5" />
              <span>Education Section</span>
            </div>

            {/* Gallery */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'gallery'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('gallery');
                setShowContentDropdown(false);
              }}
            >
              <GalleryIcon className="w-5 h-5" />
              <span>Gallery Section</span>
            </div>

            {/* Complimentary Service */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'complimentaryService'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('complimentaryService');
                setShowContentDropdown(false);
              }}
            >
              <ComplimentaryIcon className="w-5 h-5" />
              <span>Complimentary Service</span>
            </div>

            {/* Query (reuse ArticleIcon as placeholder) */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'query'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('query');
                setShowContentDropdown(false);
              }}
            >
              <ArticleIcon className="w-5 h-5" />
              <span>Query</span>
            </div>

            {/* Services */}
            <div
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer mb-1 ${
                activeMenu === 'services'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveMenu('services');
                setShowContentDropdown(false);
              }}
            >
              <Settings className="w-5 h-5" />
              <span>Service Section</span>
            </div>

            <div className="flex-1" />
          </div>
        </nav>
      </div>

      {/* Right side */}
      <div className="flex flex-col flex-1 min-h-0">
        <header className="bg-white shadow-sm border-b border-gray-200 shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Icons retained */}
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  10
                </span>
              </div>
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
              </div>
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4.83 2.17a4 4 0 00-5.66 5.66l1.34 1.34m0 0l2.83 2.83 1.34-1.34m2.83-2.83L7.17 9.16M9 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  12
                </span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Main area now flex so inner card can stretch to bottom */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Scroll container (padding here) */}
            <div className="flex-1 overflow-auto p-6 flex flex-col min-h-0">
              <div className="flex justify-end mb-4 shrink-0">
                <LogoutButton className="px-3 py-1 bg-red-600 text-white rounded" />
              </div>

              {/* Stretch wrapper */}
              <div className="flex-1 flex min-h-0">
                <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col min-h-0">
                  {activeComponent}
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
