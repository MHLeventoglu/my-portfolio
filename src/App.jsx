import React, { useState } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from './components/sections/Home'
import { About } from './components/sections/About'
import { SideBar } from './components/SideBar'


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      {""}
      <div
        className={
          `min-h-screen transition-opacity duration-700  ${isLoaded ? "opacity-100" : "opacity-0"} text-gray-100
          flex flex-row`
        }
      >
        {/* <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="flex flex-col w-full">
          <div className=" justify-start mr-3 grad-bg bg-gray-200/5 backdrop-blur-2xl rounded-3xl my-3 pb-4 shadow-lg w-full ">
            <Home/>
            <About/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
