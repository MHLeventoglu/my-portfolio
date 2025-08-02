import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useEffect } from "react";

export const Home = () => {
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    // Firefox tarayıcı tespiti
    const userAgent = navigator.userAgent.toLowerCase();
    setIsFirefox(userAgent.indexOf('firefox') > -1);
  }, []);

// Function to handle smooth scrolling
const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }else{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center relative px-4" // flex-col ve text-center eklendi
    >
        {/* İsim Başlığı */}
        <h1 className={`max-sm:text-[3.4rem] mb-6 text-7xl max-sm:text-6xl md:text-[6.5rem] font-bold pb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight ${isFirefox ? 'wave-appear' : ''}`}>
          {isFirefox ? (
            "Muaz Hamza Leventoğlu".split("").map((char, i) => (
              <span key={i}>{char === " " ? '\u00A0' : char}</span>
            ))
          ) : (
            <span>
              <span>Muaz Hamza </span>
              <span>Leventoğlu</span>
            </span>
          )}
        </h1>

        {/* Kısa Slogan/Tanım */}
        <p className="text-xl md:text-2xl text-gray-400 mb-10">
          Computer Engineering Student | Software Developer | AI passionate
        </p>

        {/* Sosyal Medya Linkleri */}
        <div className="flex justify-center mb-12">
          <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-gray-400 text-lg">
            <li>
              <a href="https://github.com/MHLeventoglu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 flex items-center">
                <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/github-mark-white.svg?raw=true" alt="GitHub" className="inline-block w-6 h-6 mr-2" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muaz-hamza-levento%C4%9Flu-860109249/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 flex items-center">
                <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/linkedin.png?raw=true" alt="LinkedIn" className="inline-block w-6 h-6 mr-2" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300 flex items-center"> {/* TODO: Instagram kullanıcı adını güncelle */}
                <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/Instagram.png?raw=true" alt="Instagram" className="inline-block w-6 h-6 mr-2" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Butonlar */}
        <div className=" min-[947px]:hidden  flex flex-wrap justify-center gap-4">
          <a onClick={() => scrollToSection("about")} className="button min-w-30"> {/* About sayfasına yönlendirme */}
            More About Me
          </a>
          <a onClick={() => scrollToSection("projects")} className="button">
            Projects
          </a>
          <a onClick={() => scrollToSection("contact")} className="button">
            Contact Me
          </a>
        </div>
    </section>
  );
};