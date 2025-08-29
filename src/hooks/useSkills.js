import { useState, useEffect } from 'react';
import { skillsApi } from '../services/api.js';

export function useSkills() {
  const [skills, setSkills] = useState({ frontend: [], backend: [], other: [] });
  const [skillsArray, setSkillsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await skillsApi.getAll();
      if (error) throw error;
      
      const skillsList = data || [];
      setSkillsArray(skillsList);
      
      // Group skills by category for backward compatibility
      const grouped = {
        frontend: skillsList.filter(skill => skill.category === 'frontend').map(skill => skill.name),
        backend: skillsList.filter(skill => skill.category === 'backend').map(skill => skill.name),
        other: skillsList.filter(skill => skill.category === 'other').map(skill => skill.name)
      };
      
      setSkills(grouped);
    } catch (err) {
      console.error('Error loading skills:', err);
      setError(err.message || 'Failed to load skills');
      // Set fallback skills on error
      const fallbackSkills = {
        frontend: ["React + Vite", "Angular", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"],
        backend: [".Net", "Asp.net/WebApi", "Sql", "Entity Framework"],
        other: ["Python", "C++", "C#", "Java", "Git", "GitHub", "Linux", "Blender Software", "CNN training", "YOLO"]
      };
      setSkills(fallbackSkills);
      
      // Convert fallback to array format
      const fallbackArray = [
        ...fallbackSkills.frontend.map(name => ({ name, category: 'frontend', id: `fallback-${name}` })),
        ...fallbackSkills.backend.map(name => ({ name, category: 'backend', id: `fallback-${name}` })),
        ...fallbackSkills.other.map(name => ({ name, category: 'other', id: `fallback-${name}` }))
      ];
      setSkillsArray(fallbackArray);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skillData) => {
    try {
      const { data, error } = await skillsApi.create(skillData);
      if (error) throw error;
      await fetchSkills(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error adding skill:', err);
      return { success: false, error: err.message };
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      const { data, error } = await skillsApi.update(id, skillData);
      if (error) throw error;
      await fetchSkills(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error updating skill:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteSkill = async (id) => {
    try {
      const result = await skillsApi.delete(id);
      if (!result.success) throw new Error(result.error);
      await fetchSkills(); // Refresh the list
      return { success: true };
    } catch (err) {
      console.error('Error deleting skill:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { 
    skills, // Grouped format for backward compatibility
    skillsArray, // Array format for admin panel
    loading, 
    error,
    refetch: fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill
  };
}
