import React, { useState, useEffect } from "react";
import { ThemeSelector } from "./ThemeSelector";
import { useTheme } from "../contexts/ThemeContext";

export const TopBar = () => {
  const { theme } = useTheme();
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }else{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
};
  return (
    <>
      <div 
        className="max-[947px]:hidden flex flex-row items-center h-15 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl shadow-lg m-7 rounded-xl border-2 transition-all duration-300"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          boxShadow: `0 10px 25px rgba(0,0,0,0.1), 0 0 20px ${theme.colors.primary}20`
        }}
      >
        <a 
          onClick={() => scrollToSection("")} 
          className="m-3 mt-4 mr-7 max-sm:text-[2rem] text-[2rem] md:text-[2.5rem] font-bold pb-1 bg-clip-text text-transparent leading-tight cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          MHL
        </a>
        <div className="flex flex-grow justify-center gap-10 mx-10">
          <a onClick={() => scrollToSection("about")} className="button-3 min-w-30">
            More About Me
          </a>
          <a onClick={() => scrollToSection("projects")} className="button-3">
            Projects
          </a>
          <a onClick={() => scrollToSection("contact")} className="button-3">
            Contact Me
          </a>
        </div>
        
        {/* Tema seçici */}
        <div className="mx-3">
          <ThemeSelector />
        </div>
        
        <a 
          onClick={() => scrollToSection("")} 
          className="material-symbols-outlined mx-5 border-l pl-5 cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.primary
          }}
        >
          home  
        </a>

      </div>
    </>
  );
};
