// API Configuration for Campus LLM App
// This file centralizes all API endpoints and makes deployment easier

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = {
  // Event endpoints
  events: `${API_BASE}/api/events`,
  rsvp: (id) => `${API_BASE}/api/events/${id}/rsvp`,
  
  // User endpoints
  users: `${API_BASE}/api/users`,
  
  // Leaderboard endpoints
  leaderboard: `${API_BASE}/api/leaderboard`,
  
  // Prize endpoints
  prizes: `${API_BASE}/api/prizes`,
  
  // Game day endpoints
  checkin: `${API_BASE}/api/checkin`,
  
  // Chatbot endpoints
  chatbot: `${API_BASE}/api/genz-buddy`,
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Specific API functions
export const apiFunctions = {
  // Get all events
  getEvents: () => apiCall(api.events),
  
  // RSVP to an event
  rsvpToEvent: (eventId) => apiCall(api.rsvp(eventId), {
    method: 'POST',
  }),
  
  // Get all users
  getUsers: () => apiCall(api.users),
  
  // Get leaderboard
  getLeaderboard: () => apiCall(api.leaderboard),
  
  // Get prizes
  getPrizes: () => apiCall(api.prizes),
  
  // Check in to an event
  checkin: (userId, eventId) => apiCall(api.checkin, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, event_id: eventId }),
  }),
  
  // Send message to chatbot
  sendChatMessage: (prompt) => apiCall(api.chatbot, {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  }),
};

export default api;