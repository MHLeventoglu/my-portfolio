import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const [showTaken, setShowTaken] = useState(false);
  const [showCurrentlyTaking, setShowCurrentlyTaking] = useState(false);

  const frontendSkills = ["React + Vite", "Angular", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"];
  const backendSkills = [".Net", "Asp.net/WebApi", "Sql", "Entity Framework"];
  const otherTechnologies = ["Python", "C++", "C#", "Java", "Git", "GitHub", "Linux", "Blender Software","CNN training","YOLO"];
  const takenClasses = ["Introduction to Computer Engineering", "Calculus I", "Data Structures"];
  const currentlyTakingClasses = ["Computer Organization and Design", "File Organization", "Data Science"];


  return (
    <section
      id="about"
      className=" min-h-screen flex items-center justify-center my-15"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>
          <div className="card mb-10 text-center md:text-left">
            <p className="text-gray-300/80 text-md leading-relaxed">
              Hello! I am Muaz Hamza Leventoğlu, a 2nd-year Computer Engineering student at Istanbul University-Cerrahpasa, passionately dedicated to software development and artificial intelligence technology. I am experienced in developing comprehensive and scalable full-stack web projects. Focused on continuous learning and self-improvement, I currently contribute to UAV projects in my university's Gökmen UAV team and work on artificial intelligence-based projects. Thanks to my B2 level English proficiency, I effectively utilize global resources. I aim to stay updated in technology by scanning local and global resources and articles.
            </p>
          </div>

          <div className="card mb-10">
             <h3 className="text-2xl font-bold mb-6 text-center text-white">Technical Skills</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-cyan-300">🎓 Education</h3>
              <ul className="list-none text-cyan-100 opacity-80 space-y-3">
                <li className="flex items-center">
                  <strong className="w-28 inline-block">University:</strong>
                  <span>Istanbul University - Cerrahpasa</span>
                </li>
                 <li className="flex items-center">
                   <strong className="w-28 inline-block">Department:</strong>
                   <span>Computer Engineering (English)</span>
                 </li>
                 <li className="flex items-center">
                   <strong className="w-28 inline-block">Period:</strong>
                   <span>2022 – 2027 (Expected)</span>
                 </li>
                <li className="flex items-center">
                  <strong className="w-28 inline-block">Year:</strong>
                  <span>2nd Year</span>
                </li>
                <li className="flex items-center">
                  <strong className="w-28 inline-block">GPA:</strong>
                  <span>3.4 / 4.0</span>
                </li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => setShowTaken(!showTaken)}
                  className="text-sm font-semibold text-blue-400 hover:underline mb-2"
                >
                  📚 {showTaken ? "Hide Taken Courses" : "Show Taken Courses"} ({takenClasses.length})
                </button>
                {showTaken && (
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2">
                    {takenClasses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowCurrentlyTaking(!showCurrentlyTaking)}
                  className="text-sm font-semibold text-blue-400 hover:underline mb-2"
                >
                  📖 {showCurrentlyTaking
                    ? "Hide Current Courses"
                    : "Show Current Courses"} ({currentlyTakingClasses.length})
                </button>
                {showCurrentlyTaking && (
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2">
                    {currentlyTakingClasses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-lime-300">💼 Experience & Projects</h3>
              <div className="space-y-6 text-lime-100 opacity-80">
                <div>
                  <h4 className="font-semibold text-lg mb-1">Gökmen UAV Team</h4>
                  <p className="text-sm text-gray-400 mb-1">(Member, 2024 - Present)</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                     <li>Developing autonomous UAV software using CNN-based object detection.</li>
                     <li>Teamwork and preparation for the Teknofest Artificial Intelligence competition.</li>
                  </ul>
                </div>
                 <div>
                  <h4 className="font-semibold text-lg mb-1">Personal Projects</h4>
                   <p className="text-sm text-gray-400 mb-1">(Ongoing)</p>
                   <ul className="list-disc list-inside text-sm space-y-1">
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