import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase.js';

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    
    const now = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case '24hours':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7days':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    try {
      // Get analytics events
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (events) {
        setAnalytics(events);
        
        // Calculate stats
        const pageViews = events.filter(e => e.event_type === 'page_view').length;
        const projectClicks = events.filter(e => e.event_type === 'project_click').length;
        const contactSubmissions = events.filter(e => e.event_type === 'contact_form_submit').length;
        
        const uniqueIPs = new Set(events.map(e => e.ip_address).filter(ip => ip)).size;
        
        setStats({
          totalEvents: events.length,
          pageViews,
          projectClicks,
          contactSubmissions,
          uniqueVisitors: uniqueIPs || 'N/A'
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
    
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'page_view': return '👁️';
      case 'project_click': return '🖱️';
      case 'contact_form_submit': return '📨';
      default: return '📊';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('24hours')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === '24hours' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === '7days' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeRange === '30days' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-400">{stats.totalEvents || 0}</div>
          <div className="text-sm text-gray-400">Total Events</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="text-2xl font-bold text-green-400">{stats.pageViews || 0}</div>
          <div className="text-sm text-gray-400">Page Views</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-400">{stats.projectClicks || 0}</div>
          <div className="text-sm text-gray-400">Project Clicks</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-400">{stats.contactSubmissions || 0}</div>
          <div className="text-sm text-gray-400">Contact Messages</div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
        
        {analytics.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No analytics data found for the selected time range.
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {analytics.slice(0, 50).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getEventIcon(event.event_type)}</span>
                  <div>
                    <div className="text-white font-medium">
                      {event.event_type.replace('_', ' ').toUpperCase()}
                    </div>
                    {event.event_data && (
                      <div className="text-sm text-gray-400">
                        {event.event_data.page && `Page: ${event.event_data.page}`}
                        {event.event_data.project_title && `Project: ${event.event_data.project_title}`}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-400">
                  <div>{formatDate(event.created_at)}</div>
                  {event.page_url && (
                    <div className="text-xs">{event.page_url}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
