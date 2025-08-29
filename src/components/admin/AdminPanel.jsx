import { useState } from 'react';
import { AdminAuth } from './AdminAuth.jsx';
import { ProjectManager } from './ProjectManager.jsx';
import { ContactManager } from './ContactManager.jsx';
import { SkillManager } from './SkillManager.jsx';
import { ExperienceManager } from './ExperienceManager.jsx';
import { EducationManager } from './EducationManager.jsx';
import { ProfileManager } from './ProfileManager.jsx';
import { AnalyticsDashboard } from './AnalyticsDashboard.jsx';
import { testConnection } from '../../api/supabase.js';

export const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [testResults, setTestResults] = useState(null);

  const handleAuthSuccess = (user) => {
    setUser(user);
  };

  const runDatabaseTest = async () => {
    console.log('Running database test...');
    const results = await testConnection();
    setTestResults(results);
  };

  const tabs = [
    { id: 'profile', label: '👤 Profile', component: ProfileManager },
    { id: 'projects', label: '📁 Projects', component: ProjectManager },
    { id: 'experiences', label: '💼 Work Experience', component: ExperienceManager },
    { id: 'education', label: '🎓 Education', component: EducationManager },
    { id: 'skills', label: '⚡ Skills', component: SkillManager },
    { id: 'contacts', label: '💬 Messages', component: ContactManager },
    { id: 'analytics', label: '📊 Analytics', component: AnalyticsDashboard },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <AdminAuth onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    );
  }

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfileManager;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={runDatabaseTest}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Test Database
            </button>
            <span className="text-sm text-gray-300">
              Welcome, {user?.email}
            </span>
          </div>
        </div>

        {/* Database Test Results */}
        {testResults && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-white">Database Test Results:</h3>
            <div className="space-y-2 text-sm">
              <p className={`${testResults.connection ? 'text-green-400' : 'text-red-400'}`}>
                Connection: {testResults.connection ? '✓ Connected' : '✗ Failed'}
              </p>
              {testResults.tables && Object.entries(testResults.tables).map(([table, exists]) => (
                <p key={table} className={`${exists ? 'text-green-400' : 'text-red-400'}`}>
                  Table '{table}': {exists ? '✓ Exists' : '✗ Not found'}
                </p>
              ))}
              {testResults.error && (
                <p className="text-red-400">Error: {testResults.error}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Component */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};
