import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const [showTaken, setShowTaken] = useState(false);
  const [showCurrentlyTaking, setShowCurrentlyTaking] = useState(false);

  const frontendSkills = ["React + Vite", "Angular", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"];
  const backendSkills = [".Net", "Asp.net/WebApi", "Sql", "Entity Framework"];
  const otherTechnologies = ["Python", "C++", "C#", "Java", "Git", "GitHub", "Linux", "Blender Software","CNN training","YOLO"];
  
  const takenClasses = [
    "Introduction to Computer Engineering",
    "Calculus I",
    "Discrete Mathematics",
    "Physics I",
    "Introduction to Algorithms",
    "Calculus II",
    "Physics II",
    "Introduction to Programming",
    "Linear Algebra",
    "Circuits and Systems",
    "Differential Equations",
    "Logic Circuit Design",
    "Object-Oriented Programming",
    "Probability Theory and Statistics",
    "Data Structures",
  ];

  const currentlyTakingClasses = [
    "Computer Organization and Design",
    "File Organization",
    "Logic Circuits Laboratory",
    "Microprocessors",
    "Numerical Methods",
    "Software Development Design and Practice",
    "Data Science",
  ];


  return (
    <section
      id="about"
      className=" min-h-screen flex items-center justify-center my-15 pt-10"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>
          <div className="card mb-10 text-center md:text-left relative animate-card-slide-in-left">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-cyan-400/80 to-blue-500/60 rounded-l-xl"></div>
            <p className="text-gray-300/80 text-lg leading-relaxed relative z-10">
              Hello! I am Muaz Hamza Leventoğlu, a 2nd-year Computer Engineering student at Istanbul University-Cerrahpasa, passionately dedicated to software development and artificial intelligence technology. I am experienced in developing comprehensive and scalable full-stack web projects. Focused on continuous learning and self-improvement, I currently contribute to UAV projects in my university's Gökmen UAV team and work on artificial intelligence-based projects. Thanks to my B2 level English proficiency, I effectively utilize global resources. I aim to stay updated in technology by scanning local and global resources and articles.
            </p>
          </div>

          <div className="card mb-10 relative animate-card-slide-in-left">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-cyan-400/80 to-blue-500/60 rounded-l-xl"></div>
            <h3 className="text-2xl font-bold mb-6 text-center text-white relative z-10">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="rounded-xl p-6  border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                    {frontendSkills.map((tech, key) => (
                        <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition">{tech}</span>
                    ))}
                    </div>
                </div>
                <div className="rounded-xl p-6  border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
                    <h4 className="text-xl font-semibold mb-4 text-green-400">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                    {backendSkills.map((tech, key) => (
                        <span key={key} className="bg-green-500/10 text-green-500 py-1 px-3 rounded-full text-sm hover:bg-green-500/20 transition">{tech}</span>
                    ))}
                    </div>
                </div>
                <div className="rounded-xl p-6  border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
                    <h4 className="text-xl font-semibold mb-4 text-purple-400">Other Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                    {otherTechnologies.map((tech, key) => (
                        <span key={key} className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20 transition">{tech}</span>
                    ))}
                    </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div className="card border-[0.01rem] border-green-900 bg-green-900/40 hover:bg-green-900/60 shadow-lg rounded-xl relative animate-card-slide-in-left">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-green-400/80 to-green-700/60 rounded-l-xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-green-300 flex items-center gap-2 relative z-10">
                <span className="inline-block bg-green-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-green-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                </span>
                🎓 Education
              </h3>
              <ul className="list-none text-green-100 opacity-90 space-y-3 text-base relative z-10">
                <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                  <span className="inline-block bg-green-500/30 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  <strong className="w-28 inline-block">University:</strong>
                  <span>Istanbul University - Cerrahpasa</span>
                </li>
                <li className="flex items-center gap-3 bg-green-800/10 rounded-lg px-3 py-2">
                  <span className="inline-block bg-green-500/30 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  <strong className="w-28 inline-block">Department:</strong>
                  <span>Computer Engineering (English)</span>
                </li>
                <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                  <span className="inline-block bg-green-500/30 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  <strong className="w-28 inline-block">Period:</strong>
                  <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold">2022 – 2027 (Expected)</span>
                </li>
                <li className="flex items-center gap-3 bg-green-800/10 rounded-lg px-3 py-2">
                  <span className="inline-block bg-green-500/30 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  <strong className="w-28 inline-block">Year:</strong>
                  <span>2nd Year</span>
                </li>
                <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                  <span className="inline-block bg-green-500/30 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  <strong className="w-28 inline-block">GPA:</strong>
                  <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold">3.4 / 4.0</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-2 relative z-10">
                <button
                  onClick={() => setShowTaken(!showTaken)}
                  className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-1"
                >
                  <span className="inline-block bg-green-500/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  {showTaken ? "Hide Taken Courses" : "Show Taken Courses"} ({takenClasses.length})
                </button>
                {showTaken && (
                  <ul className="list-disc list-inside text-sm text-green-200 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar bg-green-900/10 rounded-lg p-2">
                    {takenClasses.map((course, index) => (
                      <li key={index} className="flex items-center gap-2"><span className="inline-block bg-green-500/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>{course}</li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => setShowCurrentlyTaking(!showCurrentlyTaking)}
                  className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-1"
                >
                  <span className="inline-block bg-green-500/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                  {showCurrentlyTaking ? "Hide Current Courses" : "Show Current Courses"} ({currentlyTakingClasses.length})
                </button>
                {showCurrentlyTaking && (
                  <ul className="list-disc list-inside text-sm text-green-200 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar bg-green-900/10 rounded-lg p-2">
                    {currentlyTakingClasses.map((course, index) => (
                      <li key={index} className="flex items-center gap-2"><span className="inline-block bg-green-500/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="card border-[0.01rem] border-purple-900 bg-purple-900/40 hover:bg-purple-900/60 shadow-lg rounded-xl relative animate-card-slide-in-left">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-purple-400/80 to-purple-700/60 rounded-l-xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center gap-2 relative z-10">
                <span className="inline-block bg-purple-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-purple-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                </span>
                💼 Experience & Projects
              </h3>
              <div className="space-y-6 text-purple-100 opacity-90 relative z-10">
                <div className="bg-purple-400/10 rounded-xl p-4 shadow-inner border border-purple-700/30">
                  <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    <span className="inline-block bg-purple-400/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-purple-300' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                    Gökmen UAV Team
                    <span className="ml-auto bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full text-xs font-semibold">2024 - Present</span>
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                     <li>Developing autonomous UAV software using CNN-based object detection.</li>
                     <li>Teamwork and preparation for the Teknofest Artificial Intelligence competition.</li>
                  </ul>
                </div>
                 <div className="bg-purple-400/10 rounded-xl p-4 shadow-inner border border-purple-700/30">
                  <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    <span className="inline-block bg-purple-400/20 rounded-full p-1"><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-purple-300' fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg></span>
                    Personal Projects
                    <span className="ml-auto bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full text-xs font-semibold">Ongoing</span>
                  </h4>
                   <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                     <li>Developing various web applications using ASP.NET Core Web API and Angular/React.</li>
                     <li>Contributing group projects and publishing my own projects on GitHub.</li>
                   </ul>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};