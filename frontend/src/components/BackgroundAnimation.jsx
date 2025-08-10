import React from 'react';
import { useTheme } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
        }`}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-pulse ${
              isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'
            }`}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 4 + 3 + 's',
            }}
          />
        ))}
      </div>

      {/* Animated Circles */}
      <div className="absolute inset-0">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-blob ${
            isDark ? 'bg-blue-600/20' : 'bg-blue-400/20'
          }`}
        />
        <div 
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2000 ${
            isDark ? 'bg-purple-600/20' : 'bg-purple-400/20'
          }`}
        />
        <div 
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-4000 ${
            isDark ? 'bg-pink-600/20' : 'bg-pink-400/20'
          }`}
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className={`absolute inset-0 opacity-20 ${
          isDark ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)]'
        }`}
        style={{
          backgroundSize: '50px 50px'
        }}
      />

      {/* Noise Texture */}
      <div 
        className={`absolute inset-0 opacity-30 ${
          isDark ? 'bg-noise-dark' : 'bg-noise-light'
        }`}
      />
    </div>
  );
};

export default BackgroundAnimation;
