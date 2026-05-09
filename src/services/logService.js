/**
 * Mock Log Service
 * Provides sample data for the Dashboard.
 */

const MOCK_LOGS = [
  {
    id: '1',
    date: '27',
    month: 'MAR',
    title: 'UI/UX Design Sprint',
    time: '8:00 AM - 5:00 PM',
    hours: 8,
    status: 'PENDING'
  },
  {
    id: '2',
    date: '26',
    month: 'MAR',
    title: 'Frontend Development',
    time: '9:00 AM - 6:00 PM',
    hours: 8,
    status: 'APPROVED'
  },
  {
    id: '3',
    date: '25',
    month: 'MAR',
    title: 'Client Meeting & Docs',
    time: '10:00 AM - 4:00 PM',
    hours: 6,
    status: 'APPROVED'
  }
];

export const logService = {
  getRecentLogs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_LOGS), 300);
    });
  },

  getProgressData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        percentage: 60,
        rendered: 180,
        required: 300,
        remaining: 120
      }), 300);
    });
  }
};

export default logService;
