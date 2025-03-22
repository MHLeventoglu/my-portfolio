import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const [showTaken, setShowTaken] = useState(false);
  const [showCurrentlyTaking, setShowCurrentlyTaking] = useState(false);

  const frontendSkills = [
    "React + Vite",
    "Angular",
    "TypeScript",
    "JavaScript",
    "TailwindCSS",
    "Bootstrap",
  ];

  const backendSkills = [".Net", "Asp.net/WebApi", "Sql", "Entity Framework"];

  const otherTechnologies = [
    "Python",
    "C++",
    "C#",
    "Java",
    "Git",
    "GitHub",
    "Linux",
    "Blender Software",
  ];

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
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="card">
            <p className="text-gray-300 mb-6">
              Passionate developer with interest in AI and expertise in building
              scalable web applications and creating innovative solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Other Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {otherTechnologies.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>B.S. in Computer Engineering</strong> – Istanbul
                  University - Cerrahpasa (2022–2027)
                </li>
                <li>
                  <strong>Current grade:</strong> 2nd year
                </li>
                <li>
                  <strong>GPA:</strong> 3.4/4.0
                </li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => setShowTaken(!showTaken)}
                  className="text-sm font-semibold text-blue-400 hover:underline mb-2"
                >
                  📚 {showTaken ? "Hide Taken Classes" : "Show Taken Classes"}
                </button>
                {showTaken && (
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 ml-4">
                    {takenClasses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowCurrentlyTaking(!showCurrentlyTaking)}
                  className="text-sm font-semibold text-blue-400 hover:underline mb-2"
                >
                  📖 {showCurrentlyTaking
                    ? "Hide Currently Taking Classes"
                    : "Show Currently Taking Classes"}
                </button>
                {showCurrentlyTaking && (
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 ml-4">
                    {currentlyTakingClasses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">💼 Work Experience</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">Gökmen UAV team (2024 - Present)</h4>
                  <p>Developed and maintained autonomous drone software.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};