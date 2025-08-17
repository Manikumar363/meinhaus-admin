import React, { useState } from 'react';

const CourseSection = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Construction',
      description: 'Basic principles of construction management',
      duration: '8 weeks',
      level: 'Beginner',
      isActive: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving courses section:', courses);
    alert('Courses section saved successfully!');
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: '',
      description: '',
      duration: '',
      level: 'Beginner',
      isActive: true
    };
    setCourses([...courses, newCourse]);
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Course Management</h3>
        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Course
        </button>
      </div>
      
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={course.id} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) => {
                    const newCourses = [...courses];
                    newCourses[index].title = e.target.value;
                    setCourses(newCourses);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={course.duration}
                  onChange={(e) => {
                    const newCourses = [...courses];
                    newCourses[index].duration = e.target.value;
                    setCourses(newCourses);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., 8 weeks"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={course.description}
                onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index].description = e.target.value;
                  setCourses(newCourses);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter course description"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'media'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      <div className="py-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'media' && (
          <div className="text-center py-8 text-gray-500">
            <p>Media management coming soon...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center py-8 text-gray-500">
            <p>Settings coming soon...</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Save Courses Section
        </button>
      </div>
    </div>
  );
};

export default CourseSection;
