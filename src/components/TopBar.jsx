import React, { useState, useEffect } from "react";

export const TopBar = () => {
  return (
    <>
      <div className="flex flex-row items-center h-15 fixed top-0 left-0 right-0 z-50 bg-white/9 backdrop-blur-md shadow-lg shadow-sky-600/10 m-6 rounded-xl">
        <p className="m-3 mt-4 max-sm:text-[2rem] text-[2rem] md:text-[2.5rem] font-bold pb-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 bg-clip-text text-transparent leading-tight">
          MHL
        </p>
      </div>
    </>
  );
};
