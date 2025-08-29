import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Tema tanımları
export const themes = {
  forest: {
    id: 'forest',
    name: 'Forest Green',
    fontFamily: "'Libertinus serif', serif",
    colors: {
      primary: '#2e7fff', // bright green
      secondary: '#ac48ff', // turquoise  
      accent: '#ffd23f', // bright yellow
      background: 'rgba(10, 30, 31, 0.0)',
      surface: 'rgba(16, 185, 129, 0.08)',
      surfaceHover: 'rgba(16, 185, 129, 0.15)',
      text: '#f0fdf4', // green-50
      textSecondary: '#bbf7d0', // green-200
      border: 'rgba(16, 185, 129, 0.1)',
      glass: 'rgba(16, 185, 129, 0.1)',
    },
    backgroundImage: 'url(https://raw.githubusercontent.com/MHLeventoglu/my-portfolio/refs/heads/main/src/assets/forest_bg.jpg)',
  },
  default: {
    id: 'default',
    name: 'Space Grotesk Classic',
    fontFamily: "'Space Grotesk', sans-serif",
    colors: {
      primary: '#3b82f6', // blue-500
      secondary: '#8b5cf6', // purple-500
      accent: '#06b6d4', // cyan-500
      background: 'rgba(10, 30, 31, 1)',
      surface: 'rgba(255, 255, 255, 0.05)',
      surfaceHover: 'rgba(59, 130, 246, 0.1)',
      text: '#f3f4f6', // gray-100
      textSecondary: '#d1d5db', // gray-300
      border: 'rgba(255, 255, 255, 0.1)',
      glass: 'rgba(255, 255, 255, 0.05)',
    },
    backgroundImage: 'linear-gradient(218deg, rgba(10,30,31,1) 16%, rgb(8, 40, 53) 77%)',
    gradient: 'linear-gradient(38deg, rgba(9,46,61,1) 34%, rgba(29,41,70,1) 75%, rgba(84,27,96,1) 115%)',
  },
  ocean: {
    id: 'ocean',
    name: 'Deep Ocean',
    fontFamily: "'Nunito', 'Arial', sans-serif",
    colors: {
      primary: '#0ea5e9', // sky-500
      secondary: '#06b6d4', // cyan-500
      accent: '#10b981', // emerald-500
      background: 'rgba(2, 19, 38, 0.95)',
      surface: 'rgba(14, 165, 233, 0.12)',
      surfaceHover: 'rgba(14, 165, 233, 0.2)',
      text: '#e0f7fa', // light cyan
      textSecondary: '#81d4fa', // light blue
      border: 'rgba(14, 165, 233, 0.35)',
      glass: 'rgba(6, 182, 212, 0.1)',
    },
    backgroundImage: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0c4a6e 40%, #021326 100%)',
    gradient: 'linear-gradient(180deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.08) 100%)',
  },
  vibrant: {
    id: 'vibrant',
    name: 'Neon Cyberpunk',
    fontFamily: "'Orbitron', 'Courier New', monospace",
    colors: {
      primary: '#ff0080', // hot pink
      secondary: '#00ffff', // cyan
      accent: '#ffff00', // electric yellow
      background: 'rgba(5, 5, 25, 0.95)',
      surface: 'rgba(255, 0, 128, 0.12)',
      surfaceHover: 'rgba(255, 0, 128, 0.1)',
      text: '#ffffff',
      textSecondary: '#ff80c0', // light pink
      border: 'rgba(255, 0, 128, 0.1)',
      glass: 'rgba(0, 255, 255, 0.08)',
    },
    backgroundImage: 'radial-gradient(circle at 25% 25%, #ff0080 0%, #8000ff 25%, #0080ff 50%, #00ffff 75%, #000020 100%)',
    gradient: 'linear-gradient(135deg, rgba(255, 0, 128, 0.2) 0%, rgba(0, 255, 255, 0.15) 50%, rgba(255, 255, 0, 0.1) 100%)',
  },
  dark: {
    id: 'dark',
    name: 'Minimalist Pro',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
    colors: {
      primary: '#2e7fff', // bright green
      secondary: '#ac48ff', // turquoise  
      accent: '#14b8a6', // teal-500
      background: 'rgba(0, 0, 0, 0.95)',
      surface: 'rgba(99, 102, 241, 0.06)',
      surfaceHover: 'rgba(99, 102, 241, 0.12)',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      border: 'rgba(99, 102, 241, 0.1)',
      glass: 'rgba(99, 102, 241, 0.05)',
    },
    backgroundImage: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)',
    gradient: 'linear-gradient(225deg, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(244, 63, 94, 0.06) 100%)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('forest');
  
  // Local storage'dan tema tercihini yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Tema değiştiğinde local storage'a kaydet
  useEffect(() => {
    localStorage.setItem('portfolio-theme', currentTheme);
    
    // CSS custom properties'i güncelle
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    root.style.setProperty('--bg-image', theme.backgroundImage);
    root.style.setProperty('--bg-gradient', theme.gradient);
    root.style.setProperty('--font-family', theme.fontFamily);
    
    // Body font ailesini direkt güncelle
    document.body.style.fontFamily = theme.fontFamily;
    
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
