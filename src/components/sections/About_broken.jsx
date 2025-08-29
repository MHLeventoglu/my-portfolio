import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { useSkills } from "../../hooks/useSkills";
import { useEducation } from "../../hooks/useEducation";
import { useExperiences } from "../../hooks/useExperiences";
import { useProfile } from "../../hooks/useProfile";

export const About = () => {
  const [showTaken, setShowTaken] = useState(false);
  const [showCurrentlyTaking, setShowCurrentlyTaking] = useState(false);
  
  console.log('About component rendering...'); // Debug log

  // Try to use hooks with fallback
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();
  const { education, loading: educationLoading, error: educationError } = useEducation();
  const { experiences, loading: experiencesLoading, error: experiencesError } = useExperiences();
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  
  console.log('Skills data:', { skills, skillsLoading, skillsError }); // Debug log
  console.log('Education data:', { education, educationLoading, educationError }); // Debug log
  console.log('Experiences data:', { experiences, experiencesLoading, experiencesError }); // Debug log
  console.log('Profile data:', { profile, profileLoading, profileError }); // Debug log
  
  // Fallback data
  const fallbackFrontendSkills = ["React + Vite", "Angular", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"];
  const fallbackBackendSkills = [".Net", "Asp.net/WebApi", "Sql", "Entity Framework"];
  const fallbackOtherTechnologies = ["Python", "C++", "C#", "Java", "Git", "GitHub", "Linux", "Blender Software","CNN training","YOLO"];
  
  // Use skills from database if available, otherwise use fallback
  const frontendSkills = skills?.frontend?.length > 0 ? skills.frontend : fallbackFrontendSkills;
  const backendSkills = skills?.backend?.length > 0 ? skills.backend : fallbackBackendSkills;
  const otherTechnologies = skills?.other?.length > 0 ? skills.other : fallbackOtherTechnologies;

  // Use experiences from hook if available
  const workExperiences = experiences && experiences.length > 0 ? experiences : [];
  
  // Use education data from hook if available
  const educationData = education && education.length > 0 ? education : [
    {
      university: "Sakarya University",
      department: "Computer Engineering",
      start_year: 2023,
      end_year: null,
      current_year: "4th Year",
      gpa: 3.52,
      is_current: true,
      type: "Bachelor"
    }
  ];

  // Fallback courses data
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
    "Computer Organization and Design",
  ];

  const currentlyTakingClasses = [
    "Operating Systems",
    "Database Management Systems",  
    "Computer Networks",
    "Software Engineering"
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center my-15 pt-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/forest_bg.jpg?raw=true')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <RevealOnScroll>
          <h2 className="text-5xl font-bold mb-12 text-center text-white">About Me</h2>
        </RevealOnScroll>

        <div className="mb-12 text-center">
          <RevealOnScroll>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
              {profile?.about || 
                "I am a Computer Engineering student passionate about software development, artificial intelligence, and creating innovative solutions. I enjoy working with modern technologies and continuously learning new skills."
              }
            </p>
          </RevealOnScroll>
        </div>

        {/* Skills Section */}
        <RevealOnScroll>
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Skills & Technologies</h3>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <RevealOnScroll>
            <div className="rounded-xl p-6 border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
              <h4 className="text-xl font-semibold mb-4 text-blue-400">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((tech, key) => (
                  <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition">{tech}</span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="rounded-xl p-6 border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
              <h4 className="text-xl font-semibold mb-4 text-green-400">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((tech, key) => (
                  <span key={key} className="bg-green-500/10 text-green-500 py-1 px-3 rounded-full text-sm hover:bg-green-500/20 transition">{tech}</span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="rounded-xl p-6 border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg hover:-translate-y-1 transition-all">
              <h4 className="text-xl font-semibold mb-4 text-purple-400">Other Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {otherTechnologies.map((tech, key) => (
                  <span key={key} className="bg-purple-500/10 text-purple-500 py-1 px-3 rounded-full text-sm hover:bg-purple-500/20 transition">{tech}</span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Education Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <RevealOnScroll>
            <div className="card border-[0.01rem] border-green-900 bg-green-900/40 hover:bg-green-900/60 shadow-lg rounded-xl relative">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-green-400/80 to-green-700/60 rounded-l-xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-green-300 flex items-center gap-2 relative z-10">
                <span className="inline-block bg-green-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-green-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                </span>
                🎓 Education
              </h3>
              
              <div className="space-y-4 relative z-10">
                {educationData.map((edu, index) => (
                  <div key={edu.id || index} className="space-y-3 text-green-100 opacity-90 mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-green-600/30 text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
                        {edu?.type || "Bachelor"}
                      </span>
                      {edu?.is_current && (
                        <span className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                          Currently Studying
                        </span>
                      )}
                    </div>
                    <ul className="list-none text-base space-y-3">
                      <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                        <span className="inline-block bg-green-500/30 rounded-full p-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <strong className="w-28 inline-block">University:</strong>
                        <span>{edu?.university || "Sakarya University"}</span>
                      </li>
                      <li className="flex items-center gap-3 bg-green-800/10 rounded-lg px-3 py-2">
                        <span className="inline-block bg-green-500/30 rounded-full p-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <strong className="w-28 inline-block">Department:</strong>
                        <span>{edu?.department || "Computer Engineering"}</span>
                      </li>
                      <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                        <span className="inline-block bg-green-500/30 rounded-full p-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <strong className="w-28 inline-block">Period:</strong>
                        <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold">
                          {edu?.start_year || 2023} – {edu?.is_current ? "Present" : (edu?.end_year || "Present")}
                        </span>
                      </li>
                      {edu?.current_year && (
                        <li className="flex items-center gap-3 bg-green-800/10 rounded-lg px-3 py-2">
                          <span className="inline-block bg-green-500/30 rounded-full p-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'>
                              <circle cx='10' cy='10' r='10'/>
                            </svg>
                          </span>
                          <strong className="w-28 inline-block">Current:</strong>
                          <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold">
                            {edu?.current_year}
                          </span>
                        </li>
                      )}
                      {edu?.gpa && (
                        <li className="flex items-center gap-3 bg-green-800/20 rounded-lg px-3 py-2">
                          <span className="inline-block bg-green-500/30 rounded-full p-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-200' fill='currentColor' viewBox='0 0 20 20'>
                              <circle cx='10' cy='10' r='10'/>
                            </svg>
                          </span>
                          <strong className="w-28 inline-block">GPA:</strong>
                          <span className="bg-green-700/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold">
                            {edu?.gpa} / 4.0
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
                
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => setShowTaken(!showTaken)}
                    className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-1"
                  >
                    <span className="inline-block bg-green-500/20 rounded-full p-1">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                        <circle cx='10' cy='10' r='10'/>
                      </svg>
                    </span>
                    {showTaken ? "Hide Taken Courses" : "Show Taken Courses"} ({takenClasses.length})
                  </button>
                    {showTaken && (
                      <ul className="list-disc list-inside text-sm text-green-200 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar bg-green-900/10 rounded-lg p-2">
                        {takenClasses.map((course, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="inline-block bg-green-500/20 rounded-full p-1">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                                <circle cx='10' cy='10' r='10'/>
                              </svg>
                            </span>
                            {course}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      onClick={() => setShowCurrentlyTaking(!showCurrentlyTaking)}
                      className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-1"
                    >
                      <span className="inline-block bg-green-500/20 rounded-full p-1">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                          <circle cx='10' cy='10' r='10'/>
                        </svg>
                      </span>
                      {showCurrentlyTaking ? "Hide Current Courses" : "Show Current Courses"} ({currentlyTakingClasses.length})
                    </button>
                    {showCurrentlyTaking && (
                      <ul className="list-disc list-inside text-sm text-green-200 space-y-1 ml-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar bg-green-900/10 rounded-lg p-2">
                        {currentlyTakingClasses.map((course, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="inline-block bg-green-500/20 rounded-full p-1">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                                <circle cx='10' cy='10' r='10'/>
                              </svg>
                            </span>
                            {course}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Experience Section */}
          <RevealOnScroll>
            <div className="card border-[0.01rem] border-purple-900 bg-purple-900/40 hover:bg-purple-900/60 shadow-lg rounded-xl relative">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-purple-400/80 to-purple-700/60 rounded-l-xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300 flex items-center gap-2 relative z-10">
                <span className="inline-block bg-purple-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-purple-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                </span>
                💼 Experience & Projects
              </h3>
              <div className="space-y-6 text-purple-100 opacity-90 relative z-10">
                {workExperiences.length > 0 ? (
                  workExperiences.map((exp, index) => (
                    <div key={exp.id || index} className="bg-purple-400/10 rounded-xl p-4 shadow-inner border border-purple-700/30">
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                        <span className="inline-block bg-purple-400/20 rounded-full p-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-purple-300' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        {exp.title}
                        <span className="ml-auto bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full text-xs font-semibold">
                          {exp.start_date ? new Date(exp.start_date).getFullYear() : ''} - {exp.is_current ? 'Present' : (exp.end_date ? new Date(exp.end_date).getFullYear() : '')}
                        </span>
                        {exp.is_current && (
                          <span className="bg-green-600/30 text-green-200 px-2 py-1 rounded-full text-xs font-semibold ml-2">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-purple-200/80 mb-2 font-medium">
                        {exp.organization}
                      </p>
                      {exp.descriptions && Array.isArray(exp.descriptions) && exp.descriptions.length > 0 && (
                        <ul className="text-sm text-purple-200/80 space-y-1">
                          {exp.descriptions.map((desc, descIndex) => (
                            <li key={descIndex} className="flex items-start gap-2">
                              <span className="inline-block bg-purple-500/20 rounded-full p-1 mt-1 flex-shrink-0">
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-2 w-2 text-purple-300' fill='currentColor' viewBox='0 0 20 20'>
                                  <circle cx='10' cy='10' r='10'/>
                                </svg>
                              </span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-center text-purple-200/80">
                      Currently building experience through academic projects and personal development.
                      Open to internship and collaboration opportunities!
                    </p>
                    
                    <div className="bg-purple-400/10 rounded-xl p-4 shadow-inner border border-purple-700/30">
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                        <span className="inline-block bg-purple-400/20 rounded-full p-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-purple-300' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        Portfolio Website Development
                        <span className="ml-auto bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full text-xs font-semibold">
                          2024 - Present
                        </span>
                      </h4>
                      <p className="text-sm text-purple-200/80 mb-2">
                        Full-stack web development with React, Supabase, and modern web technologies
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">React</span>
                        <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">Vite</span>
                        <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">Supabase</span>
                        <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">TailwindCSS</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
