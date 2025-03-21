import { useEffect, useState } from "react";
import { RevealOnScroll } from "./RevealOnScroll";

export const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <section id="footer" className="w-full bg-gray-900/20 text-white/70 py-8 mt-12">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-sm text-gray-400">
              This web page is developed by {" "}
              <a
                href="https://github.com/MHLeventoglu"
                className="underline hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                MHLeventoglu
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Email: <a href="mailto:mhleventoglu@hotmail.com" className="hover:text-white">mhleventoglu@hotmail.com</a></li>
              <li>Phone: <a href="tel:+905537688340" className="hover:text-white">+90 553 768 83 40</a></li>
              <li>Location: Başakşehir, İstanbul</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Follow Me</h2>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><a href="https://github.com/MHLeventoglu" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
              <li><a href="https://linkedin.com/in/mhleventoglu" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          © {year} <a href="https://github.com/MHLeventoglu" className="hover:text-white">MHLeventoglu</a>. All rights reserved.
        </div>
      </RevealOnScroll>
    </section>
  );
};
