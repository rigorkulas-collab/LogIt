/**
 * Mock Log Service
 * Provides expanded sample data for the Dashboard and History pages.
 */

const MOCK_LOGS = [
  {
    id: '1',
    title: 'UI/UX Design Sprint',
    date: 'March 27, 2026',
    day: '27',
    month: 'MAR',
    hours: 8,
    status: 'PENDING',
    mood: 'Happy',
    moodEmoji: '😄'
  },
  {
    id: '2',
    title: 'Frontend Development',
    date: 'March 26, 2026',
    day: '26',
    month: 'MAR',
    hours: 8,
    status: 'APPROVED',
    mood: 'Neutral',
    moodEmoji: '😐'
  },
  {
    id: '3',
    title: 'Client Meeting & Docs',
    date: 'March 25, 2026',
    day: '25',
    month: 'MAR',
    hours: 6,
    status: 'APPROVED',
    mood: 'Happy',
    moodEmoji: '😄'
  },
  {
    id: '4',
    title: 'Bug Fixing & Testing',
    date: 'March 24, 2026',
    day: '24',
    month: 'MAR',
    hours: 7,
    status: 'REJECTED',
    mood: 'Tired',
    moodEmoji: '😫'
  },
  {
    id: '5',
    title: 'API Integration',
    date: 'March 22, 2026',
    day: '22',
    month: 'MAR',
    hours: 8,
    status: 'APPROVED',
    mood: 'Happy',
    moodEmoji: '😄'
  },
  {
    id: '6',
    title: 'Database Design',
    date: 'March 21, 2026',
    day: '21',
    month: 'MAR',
    hours: 8,
    status: 'APPROVED',
    mood: 'Happy',
    moodEmoji: '😄'
  }
];

export const logService = {
  getRecentLogs: async () => {
    return MOCK_LOGS.slice(0, 3);
  },

  getAllLogs: async () => {
    return MOCK_LOGS;
  },

  getProgressData: async () => {
    return {
      percentage: 60,
      rendered: 180,
      required: 300,
      remaining: 120
    };
  }
};

export default logService;
