import { useState, useEffect } from 'react';
import { useEducation } from '../../hooks/useEducation.js';

export const EducationManager = () => {
  const { 
    education, 
    loading, 
    error,
    addEducation,
    updateEducation,
    deleteEducation,
    refetch
  } = useEducation();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    university: '',
    department: '',
    start_year: '',
    end_year: '',
    current_year: '',
    gpa: '',
    is_current: false,
    type: 'Bachelor' // Bachelor, Master, PhD, High School, etc.
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      setMessage('Error loading education: ' + error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const educationData = {
        university: formData.university.trim(),
        department: formData.department.trim(),
        start_year: formData.start_year ? parseInt(formData.start_year) : null,
        end_year: formData.is_current ? null : (formData.end_year ? parseInt(formData.end_year) : null),
        current_year: formData.current_year.trim() || null,
        gpa: formData.gpa ? parseFloat(formData.gpa) : null,
        is_current: formData.is_current,
        type: formData.type.trim()
      };

      let result;
      if (editingId) {
        result = await updateEducation(editingId, educationData);
      } else {
        result = await addEducation(educationData);
      }

      if (result.success) {
        setMessage(editingId ? 'Education updated successfully!' : 'Education added successfully!');
        resetForm();
      } else {
        setMessage('Error: ' + (result.error || 'Unknown error occurred'));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (educationItem) => {
    setFormData({
      university: educationItem.university || '',
      department: educationItem.department || '',
      start_year: educationItem.start_year || '',
      end_year: educationItem.end_year || '',
      current_year: educationItem.current_year || '',
      gpa: educationItem.gpa || '',
      is_current: educationItem.is_current || false,
      type: educationItem.type || 'Bachelor'
    });
    setEditingId(educationItem.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this education?')) {
      const result = await deleteEducation(id);
      if (result.success) {
        setMessage('Education deleted successfully!');
      } else {
        setMessage('Error deleting education: ' + result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      university: '',
      department: '',
      start_year: '',
      end_year: '',
      current_year: '',
      gpa: '',
      is_current: false,
      type: 'Bachelor'
    });
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
    return <div className="text-center py-4">Loading education...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Education Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Education
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Education List */}
      <div className="grid gap-4">
        {education?.map((edu) => (
          <div key={edu.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {edu.department}
                </h3>
                <p className="text-gray-300">{edu.university}</p>
                <div className="flex gap-4 text-sm text-gray-400 mt-2">
                  <span>{edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}</span>
                  <span className="capitalize">{edu.type}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  {edu.current_year && <span>Current Year: {edu.current_year}</span>}
                </div>
                <div className="flex gap-2 text-xs mt-2">
                  <span className={`px-2 py-1 rounded ${edu.is_visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {edu.is_visible ? 'Visible' : 'Hidden'}
                  </span>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                    Order: {edu.sort_order}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
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
              {editingId ? 'Edit Education' : 'Add New Education'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  University*
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Department*
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Education Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                >
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor's</option>
                  <option value="Master">Master's</option>
                  <option value="PhD">PhD</option>
                  <option value="Associate">Associate</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Start Year
                  </label>
                  <input
                    type="number"
                    name="start_year"
                    value={formData.start_year}
                    onChange={handleInputChange}
                    min="1900"
                    max="2030"
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    End Year
                  </label>
                  <input
                    type="number"
                    name="end_year"
                    value={formData.end_year}
                    onChange={handleInputChange}
                    min="1900"
                    max="2030"
                    disabled={formData.is_current}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white disabled:bg-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Year (if ongoing)
                  </label>
                  <input
                    type="text"
                    name="current_year"
                    value={formData.current_year}
                    onChange={handleInputChange}
                    placeholder="e.g., 4th Year, Final Year"
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    GPA
                  </label>
                  <input
                    type="number"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    min="0"
                    max="4"
                    step="0.01"
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
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
                  Currently Studying
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
                  {editingId ? 'Update' : 'Add'} Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
