import React, { useState, useEffect } from "react";

export const TopBar = () => {
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
      <div className=" max-[947px]:hidden  flex flex-row items-center h-15 fixed top-0 left-0 right-0 z-50 bg-grey/3 backdrop-blur-xl shadow-lg shadow-sky-600/10 m-7 rounded-xl border-1 border-indigo-400/20 ">
        <a onClick={ () => scrollToSection("")} className="m-3 mt-4 mr-7 max-sm:text-[2rem] text-[2rem] md:text-[2.5rem] font-bold pb-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 bg-clip-text text-transparent leading-tight cursor-pointer">
          MHL
        </a>
        {/* <div className="flex-col w-[1px] h-12 bg-indigo-500/30"></div> */}
        <div className="flex flex-grow justify-center gap-10 mx-10">
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
        <a onClick={() => scrollToSection("")} class="material-symbols-outlined mx-5 border-l pl-5 border-indigo-400/50 cursor-pointer">
          home  
        </a>

      </div>
    </>
  );
};
