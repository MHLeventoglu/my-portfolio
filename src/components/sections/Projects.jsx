import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const vibrantColors = [   
    "text-blue-400",
    "text-green-400",
    "text-purple-400",
    "text-cyan-400",
    "text-lime-300",
    "text-yellow-300",
    "text-indigo-300",
    "text-orange-200",
    "text-lime-400"
  ]

  // Replace with your GitHub username
  const githubUsername = "MHLeventoglu";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [githubUsername]);

  if (loading) {
    return (
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="text-center text-gray-300">Loading repositories...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center pt-6 pb-15"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-row justify-center text-center">
            <h2 className="flex text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
                Projects/<img className=" pb-2 px-1 opacity-95 h-10" src="/src/assets/github-mark-white.svg" alt="" /><span className="text-white">Github</span>
            </h2>
          </div>

          {/* Main Projects Card with left accent line */}
          <div className="relative card p-8 md:p-10 bg-gray-800/60 border border-cyan-900 shadow-xl rounded-2xl animate-card-slide-in-left">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-cyan-400/80 to-blue-500/60 rounded-l-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo,index) => (
                <div
                  key={repo.id}
                  className="border-[0.01rem] border-cyan-900 bg-gray-800/50 hover:bg-gray-800/80 shadow-lg rounded-xl p-6 hover:-translate-y-1 transition-all animate-card-slide-in-left"
                >
                  {/* Removed left accent line from here */}
                  <h3 className={`flex items-center gap-2 ${vibrantColors[index % vibrantColors.length]} text-xl font-bold mb-2`}>
                    <span className="relative inline-block">
                      {/* Background bullet (semi-transparent, larger) */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2">
                        <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 opacity-30 ${vibrantColors[index % vibrantColors.length]}`} fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg>
                      </span>
                      {/* Foreground bullet (normal) */}
                      <span className="relative z-10 ml-1">
                        <svg xmlns='http://www.w3.org/2000/svg' className={`h-3 w-3 ${vibrantColors[index % vibrantColors.length]}`} fill='currentColor' viewBox='0 0 20 20'><circle cx='10' cy='10' r='10'/></svg>
                      </span>
                    </span>
                    {repo.name}
                  </h3>
                  <p className={`${vibrantColors[index % vibrantColors.length]} opacity-65 mb-4`}>
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <span className="mr-4">
                      <span role="img" aria-label="star">
                        ⭐
                      </span>{" "}
                      {repo.stargazers_count}
                    </span>
                    <span>
                      <span role="img" aria-label="fork">
                        �
                      </span>{" "}
                      {repo.forks_count}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <span className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full">
                      {repo.language || "Unknown"}
                    </span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500/10 text-blue-500 py-2 px-4 rounded-full hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
