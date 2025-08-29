import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Tema seçici butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-lg backdrop-blur-lg border transition-all duration-200 hover:scale-102"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }}
        title="Tema Seç"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            d="M12 2.25A.75.75 0 0 1 12.75 3v2.25a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 12 2.25zM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59zM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75zM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591zM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18zM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59zM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12zM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Tema seçenekleri dropdown */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-64 rounded-xl backdrop-blur-lg border shadow-2xl z-50 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="p-3">
            <h3
              className="text-sm font-semibold mb-3 opacity-80"
              style={{ color: 'var(--color-text)' }}
            >
              Tema Seçin
            </h3>
            <div className="space-y-2">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                    currentTheme === theme.id ? 'ring-2 ring-opacity-50' : ''
                  }`}
                  style={{
                    backgroundColor: currentTheme === theme.id ? 'var(--color-surfaceHover)' : 'transparent',
                    color: 'var(--color-text)',
                    ringColor: currentTheme === theme.id ? theme.colors.primary : 'transparent',
                  }}
                >
                  {/* Tema önizleme kutusu */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full border-2 relative overflow-hidden"
                      style={{
                        background: theme.gradient || theme.backgroundImage,
                        borderColor: theme.colors.primary,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ backgroundColor: theme.colors.surface }}
                      />
                    </div>
                  </div>
                  
                  {/* Tema adı ve açıklaması */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{theme.name}</div>
                    <div 
                      className="text-xs opacity-70 truncate"
                      style={{ color: 'var(--color-textSecondary)' }}
                    >
                      {getThemeDescription(theme.id)}
                    </div>
                  </div>
                  
                  {/* Seçili tema işareti */}
                  {currentTheme === theme.id && (
                    <div className="flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12l2 2 4-4"
                          stroke={theme.colors.primary}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop - menü dışına tıklandığında kapat */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Tema açıklamalarını döndüren yardımcı fonksiyon
const getThemeDescription = (themeId) => {
  const descriptions = {
    default: 'Klasik Space Grotesk tasarımı',
    ocean: 'Derin okyanus mavisi teması',
    vibrant: 'Neon cyberpunk tarzı futuristik',
    dark: 'Minimal ve profesyonel tasarım',
    forest: 'Orman temasıyla doğal ve sakin',
  };
  return descriptions[themeId] || '';
};
