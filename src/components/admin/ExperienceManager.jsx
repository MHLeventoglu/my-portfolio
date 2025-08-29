import { useState, useEffect } from 'react';
import { useExperiences } from '../../hooks/useExperiences.js';

export const ExperienceManager = () => {
  const { 
    experiences, 
    loading, 
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch
  } = useExperiences();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    descriptions: [], // Array of strings (JSONB)
    start_date: '',
    end_date: '',
    is_current: false
  });
  const [message, setMessage] = useState('');
  const [descriptionsText, setDescriptionsText] = useState('');

  useEffect(() => {
    if (error) {
      setMessage('Error loading experiences: ' + error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        title: formData.title.trim(),
        organization: formData.organization.trim(),
        start_date: formData.start_date || null,
        end_date: formData.is_current ? null : (formData.end_date || null),
        is_current: formData.is_current,
        descriptions: descriptionsText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
      };

      let result;
      if (editingId) {
        result = await updateExperience(editingId, experienceData);
      } else {
        result = await addExperience(experienceData);
      }

      if (result.success) {
        setMessage(editingId ? 'Experience updated successfully!' : 'Experience added successfully!');
        resetForm();
      } else {
        setMessage('Error: ' + (result.error || 'Unknown error occurred'));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (experience) => {
    setFormData({
      title: experience.title || '',
      organization: experience.organization || '',
      descriptions: experience.descriptions || [],
      start_date: experience.start_date ? experience.start_date.split('T')[0] : '',
      end_date: experience.end_date ? experience.end_date.split('T')[0] : '',
      is_current: experience.is_current || false
    });
    setDescriptionsText(Array.isArray(experience.descriptions) 
      ? experience.descriptions.join('\n') 
      : experience.descriptions || '');
    setEditingId(experience.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const result = await deleteExperience(id);
      if (result.success) {
        setMessage('Experience deleted successfully!');
      } else {
        setMessage('Error deleting experience: ' + result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      descriptions: [],
      start_date: '',
      end_date: '',
      is_current: false
    });
    setDescriptionsText('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return <div className="text-center py-4">Loading experiences...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Work Experience Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Experience
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Experience List */}
      <div className="grid gap-4">
        {experiences?.map((exp) => (
          <div key={exp.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {exp.title}
                </h3>
                <p className="text-gray-300">{exp.organization}</p>
                <div className="flex gap-4 text-sm text-gray-400 mt-2">
                  <span>
                    {exp.start_date ? new Date(exp.start_date).getFullYear() : 'N/A'} - 
                    {exp.is_current ? ' Present' : (exp.end_date ? ` ${new Date(exp.end_date).getFullYear()}` : ' N/A')}
                  </span>
                </div>
                {exp.descriptions && exp.descriptions.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">
                    {exp.descriptions.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2 text-xs mt-2">
                  <span className={`px-2 py-1 rounded ${exp.is_current ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {exp.is_current ? 'Current' : 'Past'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Organization*
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Descriptions (one per line)
                </label>
                <textarea
                  value={descriptionsText}
                  onChange={(e) => setDescriptionsText(e.target.value)}
                  rows="5"
                  placeholder="Enter job descriptions, one per line..."
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    disabled={formData.is_current}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white disabled:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="is_current"
                    checked={formData.is_current}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Currently Working
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingId ? 'Update' : 'Add'} Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
