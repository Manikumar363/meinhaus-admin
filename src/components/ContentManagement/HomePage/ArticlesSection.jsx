import React, { useState } from 'react';

const ArticlesSection = () => {
  const [articlesContent, setArticlesContent] = useState({
    title: 'Top Articles for You',
    subtitle: 'Stay updated with our latest insights',
    articles: [
      {
        id: 1,
        title: 'Sit quaerat omnis ve',
        excerpt: 'Incididunt id sunt...',
        imageUrl: '/article-1.jpg',
        readMoreLink: '/articles/article-1',
        isPublished: true
      },
      {
        id: 2,
        title: 'Expedita similique s',
        excerpt: 'Eos maxime laborum...',
        imageUrl: '/article-2.jpg',
        readMoreLink: '/articles/article-2',
        isPublished: true
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');

  const handleSave = () => {
    console.log('Saving articles section:', articlesContent);
    alert('Articles section saved successfully!');
  };

  const addArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: '',
      excerpt: '',
      imageUrl: '',
      readMoreLink: '',
      isPublished: false
    };
    setArticlesContent({
      ...articlesContent,
      articles: [...articlesContent.articles, newArticle]
    });
  };

  const removeArticle = (articleId) => {
    const newArticles = articlesContent.articles.filter(article => article.id !== articleId);
    setArticlesContent({
      ...articlesContent,
      articles: newArticles
    });
  };

  const updateArticle = (articleId, field, value) => {
    const newArticles = articlesContent.articles.map(article => 
      article.id === articleId ? { ...article, [field]: value } : article
    );
    setArticlesContent({
      ...articlesContent,
      articles: newArticles
    });
  };

  const togglePublish = (articleId) => {
    const newArticles = articlesContent.articles.map(article => 
      article.id === articleId ? { ...article, isPublished: !article.isPublished } : article
    );
    setArticlesContent({
      ...articlesContent,
      articles: newArticles
    });
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={articlesContent.title}
            onChange={(e) => setArticlesContent({...articlesContent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
          <input
            type="text"
            value={articlesContent.subtitle}
            onChange={(e) => setArticlesContent({...articlesContent, subtitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section subtitle"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Articles</label>
          <button
            onClick={addArticle}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Article</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {articlesContent.articles.map((article, index) => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Article {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePublish(article.id)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      article.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {article.isPublished ? 'Published' : 'Draft'}
                  </button>
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => updateArticle(article.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read More Link</label>
                  <input
                    type="text"
                    value={article.readMoreLink}
                    onChange={(e) => updateArticle(article.id, 'readMoreLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter read more link"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Article Excerpt</label>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => updateArticle(article.id, 'excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter article excerpt"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Article Images</h3>
        <div className="space-y-4">
          {articlesContent.articles.map((article, index) => (
            <div key={article.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm font-medium text-gray-700">Article {index + 1}: {article.title}</span>
                {article.isPublished && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">Published</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={article.imageUrl}
                    onChange={(e) => updateArticle(article.id, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-xs text-gray-500">Upload image</p>
                  </div>
                </div>
                
                {article.imageUrl && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Image Preview</label>
                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span className="text-gray-500 text-sm">Image not found</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Grid Layout</option>
          <option>List Layout</option>
          <option>Card Layout</option>
          <option>Masonry Layout</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Articles per Row</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Articles to Show</label>
        <input
          type="number"
          min="1"
          max="12"
          defaultValue="6"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show "View All" link</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Show article dates</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span className="ml-2 text-sm text-gray-700">Enable hover effects</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Articles Section</h2>
        <p className="text-gray-600 mt-1">Manage the "Top Articles for You" section of your homepage</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'content', name: 'Content' },
            { id: 'media', name: 'Media' },
            { id: 'settings', name: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'media' && renderMediaTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>

      {/* Save Button */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Articles Section
        </button>
      </div>
    </div>
  );
};

export default ArticlesSection;
