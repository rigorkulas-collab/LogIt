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
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        if (email === MOCK_USER.email && password === 'password123') {
          resolve({
            success: true,
            user: MOCK_USER,
            token: 'mock-jwt-token'
          });
        } else {
          reject({
            success: false,
            message: 'Invalid email or password. Use student@school.edu / password123'
          });
        }
      }, 1500);
    });
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
