import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  console.log('About component rendering...'); // Debug log

  return (
    <section id="about" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          About Me - Test Version
        </h2>
        <div className="text-white text-center">
          <p>About component is rendering successfully!</p>
          <p>If you can see this, the component is working.</p>
        </div>
      </div>
    </section>
  );
};
