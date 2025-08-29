import { useState, useEffect } from 'react';
import { educationApi } from '../services/api.js';

export function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEducation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await educationApi.getAll();
      if (error) throw error;
      setEducation(data || []);
    } catch (err) {
      console.error('Error fetching education:', err);
      setError(err.message);
      // Set fallback education on error
      setEducation([
        {
          id: 1,
          university: "Sakarya University",
          department: "Computer Engineering",
          start_year: 2023,
          end_year: null,
          current_year: "4th Year",
          gpa: 3.52,
          is_current: true,
          type: "Bachelor"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addEducation = async (educationData) => {
    try {
      const { data, error } = await educationApi.create(educationData);
      if (error) throw error;
      await fetchEducation(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error adding education:', err);
      return { success: false, error: err.message };
    }
  };

  const updateEducation = async (id, educationData) => {
    try {
      const { data, error } = await educationApi.update(id, educationData);
      if (error) throw error;
      await fetchEducation(); // Refresh the list
      return { success: true, data };
    } catch (err) {
      console.error('Error updating education:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteEducation = async (id) => {
    try {
      const { error } = await educationApi.delete(id);
      if (error) throw error;
      await fetchEducation(); // Refresh the list
      return { success: true };
    } catch (err) {
      console.error('Error deleting education:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return { 
    education, 
    loading, 
    error, 
    refetch: fetchEducation,
    addEducation,
    updateEducation,
    deleteEducation
  };
}
