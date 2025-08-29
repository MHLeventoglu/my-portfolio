import { useState, useEffect } from 'react';
import { useSkills } from '../../hooks/useSkills.js';

export const SkillManager = () => {
  const { 
    skillsArray, 
    loading, 
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch
  } = useSkills();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      setMessage('Error loading skills: ' + error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = {
        name: formData.name.trim(),
        category: formData.category
      };

      let result;
      if (editingId) {
        result = await updateSkill(editingId, skillData);
      } else {
        result = await addSkill(skillData);
      }

      if (result.success) {
        setMessage(editingId ? 'Skill updated successfully!' : 'Skill added successfully!');
        resetForm();
      } else {
        setMessage('Error: ' + (result.error || 'Unknown error occurred'));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name || '',
      category: skill.category || 'frontend'
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      const result = await deleteSkill(id);
      if (result.success) {
        setMessage('Skill deleted successfully!');
      } else {
        setMessage('Error deleting skill: ' + result.error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'frontend'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Group skills by category
  const groupedSkills = skillsArray.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return <div className="text-center py-4">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Skills Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Skill
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 capitalize text-white">
              {category} ({categorySkills.length})
            </h3>
            <div className="space-y-2">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                >
                  <span className="text-white">{skill.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {categorySkills.length === 0 && (
              <p className="text-gray-400 text-sm italic">No skills in this category</p>
            )}
          </div>
        ))}
      </div>

      {Object.keys(groupedSkills).length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No skills found. Click "Add Skill" to create your first skill.
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Skill Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                  placeholder="e.g., React, Node.js, Python"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="other">Other</option>
                </select>
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
                  {editingId ? 'Update' : 'Add'} Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
