import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className=" text-left mt-60 max-sm:mt-20  text-7xl max-sm:text-5xl md:text-8xl font-bold mb-6 pb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-right flex flex-col">
            <p>Muaz Hamza</p>
            <p>Leventoğlu</p>
          </h1>

          <div className="ml-5 my-10 flex justify-start space-x-6">
            <button className=" button-2">Contact</button>
            <button className="button-2">Projects</button>
          </div>

          <div className=" max-sm:justify-center justify-between flex">
            <ul className="flex max-sm:flex-col max-sm:justify-start justify-between space-x-5 w-full max-sm:text-left text-gray-400 text-xl space-y-3">
              <li>
                <a href="https://github.com/MHLevent" target="_blank" rel="noopener noreferrer">
                  <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/github-mark-white.svg?raw=true" alt="GitHub" className="inline-block w-6 h-6 mr-2" />
                  GitHub/MHLevent
                </a>
              </li>
              <li>
                <a href="www.linkedin.com/in/muaz-hamza-leventoğlu-860109249" target="_blank" rel="noopener noreferrer">
                  <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/linkedin.png?raw=true" alt="LinkedIn" className="inline-block w-6 h-6 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <img src="https://github.com/MHLeventoglu/my-portfolio/blob/main/src/assets/Instagram.png?raw=true" alt="Instagram" className="inline-block w-6 h-6 mr-2" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="card max-w-lg md:max-w-175 mt-55 text-gray-400 ">
            <p>
            Hello, I am Muaz Hamza Leventoğlu. I am a second-year Computer Engineering student, and I am constantly improving myself in the field of software development. I have developed projects, particularly using the .NET and Angular frameworks. I am experienced in backend development with ASP.NET Core Web API and can perform database integration using Entity Framework. On the frontend side, I design modern and user-friendly interfaces with Angular, React, HTML, CSS, and Bootstrap. Additionally, as a new member of the Gökmen UAV university team, I am working on unmanned aerial vehicle projects using LLM based object detection technologies, and our team is preparing at full speed for the Artificial Intelligence competition at Teknofest Aviation, Space, and Technology Festival. I have beginner-level knowledge in game development with Unity and 3D modeling/rendering with Blender. I have advanced knowledge of Linux operating systems and continuously improve myself to use technology effectively. With my B2 level English proficiency, I do not limit myself to local resources. I am an aspiring engineer who loves reading science fiction books, keeping up with evolving technology, especially the advancements in our country, and constantly learning new things. I am someone who strives to improve myself in every aspect, particularly in engineering, and who loves learning.
             </p>
          </div>

        </div>

        <div className="py-5"></div>
        <div className="flex justify-center">
          <a href="#contact" className="button">
            Contact Me
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
};
  