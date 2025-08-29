import { useState, useEffect } from 'react';
import { experiencesApi } from '../services/api.js';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await experiencesApi.getAll();
      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError(err.message);
      // Set fallback experiences on error
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  const addExperience = async (experienceData) => {
    try {
      const { data, error } = await experiencesApi.create(experienceData);
      if (error) throw error;
      await fetchExperiences(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error adding experience:', err);
      return { success: false, error: err.message };
    }
  };

  const updateExperience = async (id, experienceData) => {
    try {
      const { data, error } = await experiencesApi.update(id, experienceData);
      if (error) throw error;
      await fetchExperiences(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error updating experience:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteExperience = async (id) => {
    try {
      const result = await experiencesApi.delete(id);
      if (!result.success) throw new Error(result.error);
      await fetchExperiences(); // Refresh the list
      return { success: true };
    } catch (err) {
      console.error('Error deleting experience:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
    addExperience,
    updateExperience,
    deleteExperience
  };
};
