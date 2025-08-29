import { useState, useEffect } from 'react';
import { projectsApi, skillsApi, experiencesApi, educationApi, contactApi, analyticsApi } from '../services/api.js';

// Custom hook for projects
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await projectsApi.getAll();
      
      if (error) {
        setError(typeof error === 'string' ? error : error.message || 'An error occurred');
      } else {
        setProjects(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const refreshProjects = async () => {
    const { data, error } = await projectsApi.getAll();
    if (!error && data) {
      setProjects(data);
    }
    return { data, error };
  };

  const addProject = async (projectData) => {
    setLoading(true);
    const { data, error } = await projectsApi.create(projectData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setProjects(prev => [data, ...prev]);
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const updateProject = async (id, projectData) => {
    setLoading(true);
    const { data, error } = await projectsApi.update(id, projectData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setProjects(prev => prev.map(project => project.id === id ? data : project));
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    const { success, error } = await projectsApi.delete(id);
    
    if (!success) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setProjects(prev => prev.filter(project => project.id !== id));
      setLoading(false);
      setError(null);
      return { success: true };
    }
  };

  return { 
    projects, 
    loading, 
    error, 
    refreshProjects,
    addProject,
    updateProject,
    deleteProject
  };
};

// Custom hook for skills
export const useSkills = (isAdmin = false) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const { data, error } = isAdmin 
        ? await skillsApi.getAllAdmin() 
        : await skillsApi.getAll();
      
      if (error) {
        setError(typeof error === 'string' ? error : error.message || 'An error occurred');
      } else {
        setSkills(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchSkills();
  }, [isAdmin]);

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  const addSkill = async (skillData) => {
    setLoading(true);
    const { data, error } = await skillsApi.create(skillData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setSkills(prev => [...prev, data]);
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const updateSkill = async (id, skillData) => {
    setLoading(true);
    const { data, error } = await skillsApi.update(id, skillData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setSkills(prev => prev.map(skill => skill.id === id ? data : skill));
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const deleteSkill = async (id) => {
    setLoading(true);
    const { success, error } = await skillsApi.delete(id);
    
    if (!success) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setSkills(prev => prev.filter(skill => skill.id !== id));
      setLoading(false);
      setError(null);
      return { success: true };
    }
  };

  const refreshSkills = async () => {
    const { data, error } = await skillsApi.getAll();
    if (!error && data) {
      setSkills(data);
    }
  };

  return { 
    skills, 
    loading, 
    error, 
    getSkillsByCategory,
    addSkill,
    updateSkill,
    deleteSkill,
    refreshSkills
  };
};

// Custom hook for experiences (work experience)
export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      const { data, error } = await experiencesApi.getAll();
      
      if (error) {
        setError(typeof error === 'string' ? error : error.message || 'An error occurred');
      } else {
        setExperiences(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const addExperience = async (experienceData) => {
    setLoading(true);
    const { data, error } = await experiencesApi.create(experienceData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setExperiences(prev => [data, ...prev]);
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const updateExperience = async (id, experienceData) => {
    setLoading(true);
    const { data, error } = await experiencesApi.update(id, experienceData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setExperiences(prev => prev.map(exp => exp.id === id ? data : exp));
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const deleteExperience = async (id) => {
    setLoading(true);
    const { success, error } = await experiencesApi.delete(id);
    
    if (!success) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setExperiences(prev => prev.filter(exp => exp.id !== id));
      setLoading(false);
      setError(null);
      return { success: true };
    }
  };

  const refreshExperiences = async () => {
    const { data, error } = await experiencesApi.getAll();
    if (!error && data) {
      setExperiences(data);
    }
  };

  return { 
    experiences, 
    loading, 
    error, 
    addExperience,
    updateExperience,
    deleteExperience,
    refreshExperiences
  };
};

// Custom hook for education data management
export const useEducation = (isAdmin = false) => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      setLoading(true);
      const { data, error } = isAdmin 
        ? await educationApi.getAllAdmin() 
        : await educationApi.getAll();
      
      if (error) {
        setError(typeof error === 'string' ? error : error.message || 'An error occurred');
      } else {
        setEducation(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchEducation();
  }, [isAdmin]);

  const refetchEducation = async () => {
    const { data, error } = await educationApi.getAll();
    if (!error && data) {
      setEducation(data);
    }
  };

  const addEducation = async (educationData) => {
    setLoading(true);
    const { data, error } = await educationApi.create(educationData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setEducation(prev => [data, ...prev]);
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const updateEducation = async (id, educationData) => {
    setLoading(true);
    const { data, error } = await educationApi.update(id, educationData);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setEducation(prev => prev.map(edu => edu.id === id ? data : edu));
      setLoading(false);
      setError(null);
      return { success: true, data };
    }
  };

  const deleteEducation = async (id) => {
    setLoading(true);
    const { success, error } = await educationApi.delete(id);
    
    if (!success) {
      const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    } else {
      setEducation(prev => prev.filter(edu => edu.id !== id));
      setLoading(false);
      setError(null);
      return { success: true };
    }
  };

  const refreshEducation = async () => {
    const { data, error } = await educationApi.getAll();
    if (!error && data) {
      setEducation(data);
    }
  };

  return { 
    education, 
    loading, 
    error, 
    addEducation,
    updateEducation,
    deleteEducation,
    refreshEducation
  };
};

// Custom hook for contact form
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitMessage = async (messageData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const { data, error } = await contactApi.submitMessage(messageData);
    
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      // Track analytics event
      analyticsApi.trackContactFormSubmit();
    }
    
    setSubmitting(false);
    return { data, error };
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
    setSubmitting(false);
  };

  return { submitMessage, submitting, success, error, resetForm };
};

// Custom hook for analytics
export const useAnalytics = () => {
  const trackPageView = (pageUrl) => {
    analyticsApi.trackPageView(pageUrl);
  };

  const trackProjectClick = (projectId, projectTitle) => {
    analyticsApi.trackProjectClick(projectId, projectTitle);
  };

  const trackEvent = (eventType, eventData) => {
    analyticsApi.trackEvent(eventType, eventData);
  };

  return { trackPageView, trackProjectClick, trackEvent };
};

// Custom hook for GitHub integration fallback
export const useGitHubProjects = (githubUsername) => {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGitHubRepos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const data = await response.json();
      setGithubRepos(data);
      
      // Optionally sync with Supabase
      await projectsApi.syncWithGitHub(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { githubRepos, loading, error, fetchGitHubRepos };
};
