import React, { useState, useEffect } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
// import { Navbar } from "./components/Navbar"; // Assuming still commented out
import { MobileMenu } from "./components/MobileMenu";
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { SideBar } from './components/SideBar';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { useTheme } from './contexts/ThemeContext';
// import { useAnalytics } from './hooks/useSupabase.js'; // Temporarily disabled

export const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  // const { trackPageView } = useAnalytics(); // Temporarily disabled

  // Track page view on app load
  useEffect(() => {
    // trackPageView('/'); // Temporarily disabled
  }, []);

  return (
    <>
      <div
        className="min-h-screen transition-all duration-700 flex flex-row"
        style={{ 
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          minHeight: '100vh'
        }}
      >
        
        {/* <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
        <TopBar/>

        <div 
          className="flex flex-col w-full p-4 sm:p-6 lg:p-8 gap-3 sm:gap-4 lg:gap-5"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        >

          <div 
            className="justify-center align-center grad-bg backdrop-blur-2xl rounded-3xl shadow-lg w-full px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-4 max-sm:rounded-lg max-sm:shadow-none"
            style={{ 
              backgroundColor: theme.colors.surface, 
              border: `1px solid ${theme.colors.border}`,
              transition: 'all 0.5s ease'
            }}
          >
            <Home />
            <div 
              className="h-px mx-27" 
              style={{ backgroundColor: theme.colors.border }}
            />
            <About />
            <div 
              className="h-px mx-27 mb-9" 
              style={{ backgroundColor: theme.colors.border }}
            />
            <Projects />
            <div 
              className="h-px mx-27" 
              style={{ backgroundColor: theme.colors.border }}
            />
            <Contact />
          </div>

          <Footer />

        </div>
      </div>
    </>
  );
};
