import { useState, useEffect } from 'react';
import { contactApi } from '../../services/api.js';

export const ContactManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    const { data, error } = await contactApi.getMessages();
    if (data) setMessages(data);
    if (error) setError(error);
    setLoading(false);
  };

  const handleMarkAsRead = async (messageId) => {
    const { error } = await contactApi.markAsRead(messageId);
    if (error) {
      alert('Error marking message as read: ' + error.message);
    } else {
      await loadMessages();
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.is_read;
    if (filter === 'read') return message.is_read;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Unread ({messages.filter(m => !m.is_read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Read ({messages.filter(m => m.is_read).length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {filter === 'all' ? 'No messages found.' : `No ${filter} messages found.`}
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-gray-700 rounded-lg p-6 ${
                !message.is_read ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {message.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{message.email}</p>
                  </div>
                  {!message.is_read && (
                    <span className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">
                      New
                    </span>
                  )}
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p>{formatDate(message.created_at)}</p>
                  {!message.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(message.id)}
                      className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs text-white transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>

              {message.subject && (
                <div className="mb-3">
                  <span className="text-sm text-gray-400">Subject: </span>
                  <span className="text-white font-medium">{message.subject}</span>
                </div>
              )}

              <div className="mb-4">
                <span className="text-sm text-gray-400">Message:</span>
                <div className="mt-2 p-4 bg-gray-800 rounded-lg text-gray-200 whitespace-pre-wrap">
                  {message.message}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <div>
                  {message.user_agent && (
                    <span className="mr-4">
                      Browser: {message.user_agent.split(' ')[0]}
                    </span>
                  )}
                  {message.ip_address && (
                    <span>IP: {message.ip_address}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
                  >
                    Reply via Email
                  </a>
                  <a
                    href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}&body=${encodeURIComponent(`Hi ${message.name},\n\nThank you for reaching out!\n\n---\nOriginal message:\n${message.message}`)}`}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
                  >
                    Quick Reply
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
