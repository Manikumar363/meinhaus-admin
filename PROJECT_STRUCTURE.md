# Admin Meinhaus - Project Structure

## Overview

This is a React-based admin dashboard for managing the MEINHAUS website content. The project uses Tailwind CSS for styling and follows a component-based architecture.

## Project Structure

```
src/
├── components/
│   ├── ContentManagement/          # Content management components
│   │   ├── index.js               # Exports all components
│   │   ├── ContentManagement.js   # Main content management container
│   │   ├── HomePage/              # Home page management
│   │   │   ├── index.js          # Home page exports
│   │   │   ├── HomePageSection.js # Main home page container
│   │   │   ├── HeroSection.js    # Hero section editor
│   │   │   ├── AboutSection.js   # About section editor
│   │   │   └── ServicesSection.js # Services section editor
│   │   ├── AboutPage/             # About page management
│   │   │   ├── index.js          # About page exports
│   │   │   ├── AboutPageSection.js # Main about page container
│   │   │   ├── CompanyInfo.js    # Company information editor
│   │   │   ├── TeamSection.js    # Team section editor
│   │   │   └── MissionVision.js  # Mission & vision editor
│   │   ├── ServicesPage/          # Services page management (coming soon)
│   │   ├── ContactPage/           # Contact page management (coming soon)
│   │   ├── BlogManagement/        # Blog management (coming soon)
│   │   └── Portfolio/             # Portfolio management (coming soon)
│   ├── Layout/                    # Layout components
│   ├── Modal/                     # Modal components
│   └── Sidebar.js                 # Sidebar component (legacy)
├── pages/
│   ├── Dashboard.js               # Main dashboard page
│   ├── Login.js                   # Login page
│   ├── ForgotPassword.js          # Forgot password page
│   └── SetNewPassword.js          # Set new password page
├── features/                      # Redux store and slices
├── hooks/                         # Custom React hooks
├── utils/                         # Utility functions
└── assets/                        # Images and static assets
```

## Content Management System

### Folder Structure

Each content management section now has its own folder with sub-pages and tools:

```
ContentManagement/
├── HomePage/                    # Home page management
│   ├── index.js               # Exports all home page components
│   ├── HomePageSection.js     # Main container with navigation
│   ├── HeroSection.js         # Hero section with Content/Media/Settings tabs
│   ├── AboutSection.js        # About section with Content/Media/Settings tabs
│   └── ServicesSection.js     # Services section with Content/Media/Settings tabs
├── AboutPage/                  # About page management
│   ├── index.js               # Exports all about page components
│   ├── AboutPageSection.js    # Main container with navigation
│   ├── CompanyInfo.js         # Company information editor
│   ├── TeamSection.js         # Team management (coming soon)
│   └── MissionVision.js       # Mission & vision editor (coming soon)
└── [Other sections...]         # Future content management areas
```

### Current Sections

1. **Home Page** - Complete management with sub-sections:

   - Hero Section (Content, Media, Settings tabs)
   - About Section (Content, Media, Settings tabs)
   - Services Section (Content, Media, Settings tabs)

2. **About Page** - Complete management with sub-sections:
   - Company Info (Company details, contact information)
   - Team Section (Coming soon)
   - Mission & Vision (Coming soon)
3. **Services Page** - Coming soon
4. **Contact Page** - Coming soon
5. **Blog Management** - Coming soon
6. **Portfolio** - Coming soon

### How to Add New Content Management Sections

#### Step 1: Create the Section Component

Create a new file in `src/components/ContentManagement/`:

```jsx
// Example: AboutPageSection.js
import React, { useState } from "react";

const AboutPageSection = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "About Us",
    description: "...",
    // Add more fields as needed
  });

  const handleSave = () => {
    // Save logic here
    console.log("Saving about page content:", aboutContent);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        About Page Content
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={aboutContent.title}
          onChange={(e) =>
            setAboutContent({ ...aboutContent, title: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={aboutContent.description}
          onChange={(e) =>
            setAboutContent({ ...aboutContent, description: e.target.value })
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save About Page
      </button>
    </div>
  );
};

export default AboutPageSection;
```

#### Step 2: Update ContentManagement.js

Add your new section to the `contentSections` array:

```jsx
import AboutPageSection from "./AboutPageSection";

const contentSections = [
  { id: "home", name: "Home Page", component: HomePageSection },
  { id: "about", name: "About Page", component: AboutPageSection }, // Updated
  // ... other sections
];
```

#### Step 3: Update the index.js file

Export your new component:

```jsx
export { default as ContentManagement } from "./ContentManagement";
export { default as HomePageSection } from "./HomePageSection";
export { default as AboutPageSection } from "./AboutPageSection"; // Add this
```

### Features of the Content Management System

1. **Tabbed Navigation** - Easy switching between different content sections
2. **Form Validation** - Built-in form handling with state management
3. **Responsive Design** - Works on all device sizes
4. **Save Functionality** - Each section can be saved independently
5. **Extensible Architecture** - Easy to add new sections

### State Management

- Each content section manages its own state using React hooks
- Form data is stored locally and can be easily connected to a backend API
- Save functions are prepared for API integration

### Styling

- Uses Tailwind CSS utility classes
- Consistent design language across all components
- Responsive grid layouts and form styling

## Future Enhancements

1. **API Integration** - Connect to backend for data persistence
2. **Image Upload** - Add image management capabilities
3. **Rich Text Editor** - Integrate WYSIWYG editor for content
4. **Version Control** - Track content changes over time
5. **Preview Mode** - See changes before publishing
6. **User Permissions** - Role-based access control

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Navigate to the dashboard
4. Click on "Content Management" to access content editing tools

## Contributing

When adding new features:

1. Follow the existing component structure
2. Use consistent naming conventions
3. Implement proper error handling
4. Add appropriate TypeScript types (if migrating to TS)
5. Test on different screen sizes
