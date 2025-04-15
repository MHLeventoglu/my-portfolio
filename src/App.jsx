import React, { useState } from "react";
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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={
          `min-h-screen transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } text-gray-100 flex flex-row`
        }
      >
        {/* <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
        <TopBar/>

        <div className="flex flex-col w-full p-4 sm:p-6 lg:p-8 gap-3 sm:gap-4 lg:gap-5">

          <div className="justify-center align-center grad-bg bg-gray-200/5 backdrop-blur-2xl rounded-3xl shadow-lg w-full px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-4 max-sm:rounded-lg max-sm:shadow-none">
            <Home />
            <div className="h-px mx-27 bg-gray-500/30 " />
            <About />
            <div className="h-px mx-27 mb-9 bg-gray-500/30 " />
            <Projects />
            <div className="h-px mx-27 bg-gray-500/30 " />
            <Contact />
          </div>

          <Footer />

        </div>
      </div>
    </>
  );
}

export default App;