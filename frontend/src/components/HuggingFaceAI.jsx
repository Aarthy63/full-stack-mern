import React, { useState, useContext } from 'react';
import { useTheme } from '../context/ThemeContext';
import { assets } from '../assets/assets';
import { huggingFaceAPI } from '../services/api';

const HuggingFaceAI = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await huggingFaceAPI.chatWithAI(query);
      if (result.success) {
        setResponse(result.response);
      } else {
        setResponse('Sorry, I encountered an error. Please try again.');
      }
    } catch (error) {
      setResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl transition-all duration-300 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <img 
              src={assets.huggingface_icon} 
              alt="AI Assistant" 
              className="w-8 h-8"
              style={isDark ? { 
                filter: 'brightness(0) invert(1)',
                WebkitFilter: 'brightness(0) invert(1)',
                MozFilter: 'brightness(0) invert(1)'
              } : {}}
            />
            <h2 className="text-xl font-bold">AI Fashion Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-20 transition-colors duration-200 ${
              isDark ? 'hover:bg-white' : 'hover:bg-gray-800'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* AI Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
              isDark ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-blue-500 bg-blue-50'
            }`}>
              <h3 className="font-semibold mb-2">Style Recommendations</h3>
              <p className="text-sm opacity-80">Get personalized fashion advice based on your preferences</p>
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
              isDark ? 'border-purple-500 bg-purple-500 bg-opacity-10' : 'border-purple-500 bg-purple-50'
            }`}>
              <h3 className="font-semibold mb-2">Size Guide</h3>
              <p className="text-sm opacity-80">AI-powered size recommendations for perfect fit</p>
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
              isDark ? 'border-green-500 bg-green-500 bg-opacity-10' : 'border-green-500 bg-green-50'
            }`}>
              <h3 className="font-semibold mb-2">Outfit Matching</h3>
              <p className="text-sm opacity-80">Find the perfect combinations for your wardrobe</p>
            </div>
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
              isDark ? 'border-orange-500 bg-orange-500 bg-opacity-10' : 'border-orange-500 bg-orange-50'
            }`}>
              <h3 className="font-semibold mb-2">Trend Analysis</h3>
              <p className="text-sm opacity-80">Stay updated with the latest fashion trends</p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className={`rounded-lg border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <div className={`p-4 border-b ${
              isDark ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <h3 className="font-semibold mb-2">Chat with AI Assistant</h3>
              <p className="text-sm opacity-80">Ask me anything about fashion, styling, or our products!</p>
            </div>
            
            {/* Response Display */}
            {response && (
              <div className={`p-4 border-b ${
                isDark ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <div className="flex items-start gap-3">
                  <img 
                    src={assets.huggingface_icon} 
                    alt="AI" 
                    className="w-6 h-6 mt-1 flex-shrink-0"
                    style={isDark ? { 
                      filter: 'brightness(0) invert(1)',
                      WebkitFilter: 'brightness(0) invert(1)',
                      MozFilter: 'brightness(0) invert(1)'
                    } : {}}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{response}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me about fashion, styling, or products..."
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>AI...</span>
                    </div>
                  ) : (
                    'Ask'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "What's trending this season?",
                "Help me choose a gift",
                "How to style a casual look?",
                "What size should I get?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className={`px-3 py-2 text-sm rounded-full border transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-10' 
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuggingFaceAI;
