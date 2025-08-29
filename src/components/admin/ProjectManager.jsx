import { useState, useEffect } from 'react';
import { useProjects, useGitHubProjects } from '../../hooks/useSupabase.js';

export const ProjectManager = () => {
  const { 
    projects, 
    loading, 
    error,
    addProject,
    updateProject,
    deleteProject,
    refreshProjects
  } = useProjects();
  
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGitHubImport, setShowGitHubImport] = useState(false);
  const [message, setMessage] = useState('');
  
  // GitHub integration
  const { githubRepos, loading: githubLoading, error: githubError, fetchGitHubRepos } = useGitHubProjects("MHLeventoglu");
  const [selectedRepos, setSelectedRepos] = useState(new Set());

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    demo_url: '',
    image_url: '',
    technologies: '',
    is_featured: false,
    status: 'completed'
  });

  useEffect(() => {
    if (error) {
      setMessage('Error loading projects: ' + error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
    };

    let result;
    if (editingProject) {
      result = await updateProject(editingProject.id, projectData);
    } else {
      result = await addProject(projectData);
    }

    if (!result.success) {
      setMessage('Error saving project: ' + result.error);
    } else {
      setMessage(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      resetForm();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      image_url: project.image_url || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      is_featured: project.is_featured || false,
      status: project.status || 'completed'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;
    
    const result = await deleteProject(project.id);
    if (!result.success) {
      setMessage('Error deleting project: ' + result.error);
    } else {
      setMessage('Project deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      github_url: '',
      demo_url: '',
      image_url: '',
      technologies: '',
      is_featured: false,
      status: 'completed'
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  // GitHub import functions
  const handleFetchGitHub = async () => {
    setShowGitHubImport(true);
    await fetchGitHubRepos();
  };

  const handleRepoSelection = (repo) => {
    const newSelected = new Set(selectedRepos);
    if (newSelected.has(repo.id)) {
      newSelected.delete(repo.id);
    } else {
      newSelected.add(repo.id);
    }
    setSelectedRepos(newSelected);
  };

  const handleImportSelected = async () => {
    if (selectedRepos.size === 0) {
      alert('Please select at least one repository to import.');
      return;
    }

    const reposToImport = githubRepos.filter(repo => selectedRepos.has(repo.id));
    let successCount = 0;
    let errorCount = 0;

    for (const repo of reposToImport) {
      const projectData = {
        title: repo.name,
        description: repo.description || `GitHub repository: ${repo.name}`,
        github_url: repo.html_url,
        technologies: repo.language ? [repo.language] : [],
        github_repo_id: repo.id,
        is_custom: false,
        stars_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        language: repo.language,
        status: 'completed'
      };

      const result = await projectsApi.create(projectData);
      if (result.error) {
        errorCount++;
        console.error(`Failed to import ${repo.name}:`, result.error);
      } else {
        successCount++;
      }
    }

    alert(`Import completed: ${successCount} projects imported successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}.`);
    
    if (successCount > 0) {
      await loadProjects();
    }
    
    setSelectedRepos(new Set());
    setShowGitHubImport(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Management</h2>
        <div className="flex gap-2">
          <button
            onClick={handleFetchGitHub}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
          >
            📥 Import from GitHub
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add Project'}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Demo URL</label>
                <input
                  type="url"
                  name="demo_url"
                  value={formData.demo_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React, Node.js, PostgreSQL"
                className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 text-white"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">Featured Project</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
              >
                {editingProject ? 'Update' : 'Create'} Project
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GitHub Import Modal */}
      {showGitHubImport && (
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Import Projects from GitHub</h3>
            <button
              onClick={() => setShowGitHubImport(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {githubLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="mt-2">Fetching repositories from GitHub...</p>
            </div>
          )}

          {githubError && (
            <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 mb-4">
              <p className="text-red-300">Error: {githubError}</p>
            </div>
          )}

          {githubRepos && githubRepos.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
                  Select repositories to import ({selectedRepos.size} selected):
                </p>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedRepos(new Set(githubRepos.map(repo => repo.id)))}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedRepos(new Set())}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
                {githubRepos.map((repo) => (
                  <div key={repo.id} className="bg-gray-600 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRepos.has(repo.id)}
                        onChange={() => handleRepoSelection(repo)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{repo.name}</h4>
                          {repo.language && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                              {repo.language}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          {repo.description || 'No description available'}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 gap-4">
                          <span>⭐ {repo.stargazers_count || 0}</span>
                          <span>🔀 {repo.forks_count || 0}</span>
                          <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleImportSelected}
                  disabled={selectedRepos.size === 0}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-white transition-colors"
                >
                  Import {selectedRepos.size} Selected
                </button>
                <button
                  onClick={() => setShowGitHubImport(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {githubRepos && githubRepos.length === 0 && !githubLoading && !githubError && (
            <div className="text-center py-8 text-gray-400">
              No public repositories found in your GitHub profile.
            </div>
          )}
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No projects found. Add your first project above.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.is_featured && (
                      <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'completed' ? 'bg-green-600 text-green-100' :
                      project.status === 'in-progress' ? 'bg-blue-600 text-blue-100' :
                      'bg-gray-600 text-gray-100'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4 text-sm text-gray-400">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        GitHub
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Demo
                      </a>
                    )}
                    <span>Stars: {project.stars_count || 0}</span>
                    <span>Forks: {project.forks_count || 0}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
