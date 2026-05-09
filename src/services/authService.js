/**
 * Mock Authentication Service
 * Simulates API calls for login and session management.
 */

const MOCK_USER = {
  id: '12345',
  email: 'student@school.edu',
  name: 'Zachary User'
};

export const authService = {
  /**
   * Simulates a login request
   */
  login: async (email, password) => {
    if (email === 'student@school.edu' && password === 'password123') {
      return {
        id: '1',
        name: 'Zachary User',
        email: 'student@school.edu'
      };
    }
    throw new Error('Invalid email or password');
  },

  /**
   * Simulates logout
   */
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

export default authService;
