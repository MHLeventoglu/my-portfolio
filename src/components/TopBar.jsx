import React, { useState, useEffect } from "react";

export const TopBar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};
  return (
    <>
      <div className="flex flex-row items-center h-15 fixed top-0 left-0 right-0 z-50 bg-white/3 backdrop-blur-lg shadow-lg shadow-sky-600/10 m-8 rounded-xl border-1 border-indigo-400/20 ">
        <a onClick={ () => scrollToSection("home")} className="m-3 mt-4 max-sm:text-[2rem] text-[2rem] md:text-[2.5rem] font-bold pb-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 bg-clip-text text-transparent leading-tight cursor-pointer">
          MHL
        </a>
        <div className="flex flex-grow justify-end gap-1 pr-1 ">
          <a onClick={() => scrollToSection("about")} className="button-3 min-w-30"> {/* About sayfasına yönlendirme */}
            More About Me
          </a>
          <a onClick={() => scrollToSection("projects")} className="button-3">
            Projects
          </a>
          <a onClick={() => scrollToSection("contact")} className="button-3">
            Contact Me
          </a>
        </div>

      </div>
    </>
  );
};
