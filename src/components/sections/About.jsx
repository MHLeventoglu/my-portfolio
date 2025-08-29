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
      className="min-h-screen flex items-center justify-center pt-6 pb-15"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              {profile?.about || 
                "I am a Computer Engineering student passionate about software development, artificial intelligence, and creating innovative solutions. I enjoy working with modern technologies and continuously learning new skills."
              }
            </p>
          </div>

          {/* Skills Section Card */}
          <div className="card relative p-8 md:p-10 bg-gray-800/60 border border-cyan-900 shadow-xl rounded-2xl animate-card-slide-in-left mb-8">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-cyan-400/80 to-blue-500/60 rounded-l-2xl"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2">
              <span className="inline-block bg-cyan-400/20 rounded-full p-2">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-cyan-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </span>
              💻 Skills & Technologies
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
                  <span className="inline-block bg-blue-400/20 rounded-full p-1">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-blue-300' fill='currentColor' viewBox='0 0 20 20'>
                      <circle cx='10' cy='10' r='10'/>
                    </svg>
                  </span>
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-sm border border-blue-500/20 hover:bg-blue-500/20 transition">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-green-300 flex items-center gap-2">
                  <span className="inline-block bg-green-400/20 rounded-full p-1">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                      <circle cx='10' cy='10' r='10'/>
                    </svg>
                  </span>
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech, key) => (
                    <span key={key} className="bg-green-500/10 text-green-400 py-1 px-3 rounded-full text-sm border border-green-500/20 hover:bg-green-500/20 transition">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                  <span className="inline-block bg-purple-400/20 rounded-full p-1">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-purple-300' fill='currentColor' viewBox='0 0 20 20'>
                      <circle cx='10' cy='10' r='10'/>
                    </svg>
                  </span>
                  Other Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {otherTechnologies.map((tech, key) => (
                    <span key={key} className="bg-purple-500/10 text-purple-400 py-1 px-3 rounded-full text-sm border border-purple-500/20 hover:bg-purple-500/20 transition">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education Card */}
            <div className="card relative p-8 md:p-10 bg-gray-800/60 border border-green-900 shadow-xl rounded-2xl animate-card-slide-in-left">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-green-400/80 to-green-700/60 rounded-l-2xl"></div>
              
              <h3 className="text-2xl font-bold text-green-300 flex items-center gap-2 mb-6">
                <span className="inline-block bg-green-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-green-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                  </svg>
                </span>
                🎓 Education
              </h3>
                
                              
              <div className="space-y-4">
                {educationData.map((edu, index) => (
                  <div key={edu.id || index} className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
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
                    <div className="space-y-2 text-gray-200">
                      <div className="flex items-start gap-2">
                        <span className="inline-block bg-green-500/20 rounded-full p-1 mt-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <div>
                          <strong className="text-green-200">University:</strong> {edu?.university || "Sakarya University"}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="inline-block bg-green-500/20 rounded-full p-1 mt-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <div>
                          <strong className="text-green-200">Department:</strong> {edu?.department || "Computer Engineering"}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="inline-block bg-green-500/20 rounded-full p-1 mt-1">
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                            <circle cx='10' cy='10' r='10'/>
                          </svg>
                        </span>
                        <div>
                          <strong className="text-green-200">Period:</strong> {edu?.start_year || 2023} – {edu?.is_current ? "Present" : (edu?.end_year || "Present")}
                        </div>
                      </div>
                      {edu?.current_year && (
                        <div className="flex items-start gap-2">
                          <span className="inline-block bg-green-500/20 rounded-full p-1 mt-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                              <circle cx='10' cy='10' r='10'/>
                            </svg>
                          </span>
                          <div>
                            <strong className="text-green-200">Current Year:</strong> {edu?.current_year}
                          </div>
                        </div>
                      )}
                      {edu?.gpa && (
                        <div className="flex items-start gap-2">
                          <span className="inline-block bg-green-500/20 rounded-full p-1 mt-1">
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3 text-green-300' fill='currentColor' viewBox='0 0 20 20'>
                              <circle cx='10' cy='10' r='10'/>
                            </svg>
                          </span>
                          <div>
                            <strong className="text-green-200">GPA:</strong> {edu?.gpa} / 4.0
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Course toggles */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setShowTaken(!showTaken)}
                    className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-2"
                  >
                    <span className="inline-block bg-green-500/20 rounded-full p-1">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                        <circle cx='10' cy='10' r='10'/>
                      </svg>
                    </span>
                    {showTaken ? "Hide Taken Courses" : "Show Taken Courses"} ({takenClasses.length})
                  </button>
                  {showTaken && (
                    <div className="bg-green-900/10 rounded-lg p-3 max-h-40 overflow-y-auto">
                      <div className="grid grid-cols-1 gap-1 text-sm text-green-200">
                        {takenClasses.map((course, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="inline-block bg-green-500/20 rounded-full p-1">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-2 w-2 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                                <circle cx='10' cy='10' r='10'/>
                              </svg>
                            </span>
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowCurrentlyTaking(!showCurrentlyTaking)}
                    className="text-sm font-semibold text-green-400 hover:underline hover:text-green-300 transition flex items-center gap-2"
                  >
                    <span className="inline-block bg-green-500/20 rounded-full p-1">
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                        <circle cx='10' cy='10' r='10'/>
                      </svg>
                    </span>
                    {showCurrentlyTaking ? "Hide Current Courses" : "Show Current Courses"} ({currentlyTakingClasses.length})
                  </button>
                  {showCurrentlyTaking && (
                    <div className="bg-green-900/10 rounded-lg p-3 max-h-40 overflow-y-auto">
                      <div className="grid grid-cols-1 gap-1 text-sm text-green-200">
                        {currentlyTakingClasses.map((course, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="inline-block bg-green-500/20 rounded-full p-1">
                              <svg xmlns='http://www.w3.org/2000/svg' className='h-2 w-2 text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                                <circle cx='10' cy='10' r='10'/>
                              </svg>
                            </span>
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="card relative p-8 md:p-10 bg-gray-800/60 border border-purple-900 shadow-xl rounded-2xl animate-card-slide-in-left">
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-purple-400/80 to-purple-700/60 rounded-l-2xl"></div>
              
              <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-2 mb-6">
                <span className="inline-block bg-purple-400/20 rounded-full p-2">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-purple-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V2a2 2 0 112 2v4M8 8v10l4-4 4 4V8' />
                  </svg>
                </span>
                💼 Experience & Projects
              </h3>
              
              <div className="space-y-4">
                {workExperiences.length > 0 ? (
                  workExperiences.map((exp, index) => (
                    <div key={exp.id || index} className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2 text-purple-200">
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
                    <p className="text-center text-purple-200/80 mb-4">
                      Currently building experience through academic projects and personal development.
                      Open to internship and collaboration opportunities!
                    </p>
                    
                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2 text-purple-200">
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
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
