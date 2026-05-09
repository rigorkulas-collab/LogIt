import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

/**
 * Firebase Log Service
 * Handles cloud storage and retrieval of OJT log entries.
 */
export const logService = {
  /**
   * Fetches the 3 most recent logs for the current user
   */
  getRecentLogs: async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const q = query(
        collection(db, 'logs'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc'),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format date for display if it's a string from Firestore
        ...formatDateFields(doc.data().date)
      }));
    } catch (error) {
      console.error("Error fetching recent logs:", error);
      return [];
    }
  },

  /**
   * Fetches all logs for the current user
   */
  getAllLogs: async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const q = query(
        collection(db, 'logs'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        ...formatDateFields(doc.data().date)
      }));
    } catch (error) {
      console.error("Error fetching all logs:", error);
      return [];
    }
  },

  /**
   * Adds a new log entry to Firestore
   */
  addLog: async (newLog) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User must be logged in to add logs");

    try {
      const logEntry = {
        ...newLog,
        userId: user.uid,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'logs'), logEntry);
      return { id: docRef.id, ...logEntry };
    } catch (error) {
      console.error("Error adding log:", error);
      throw error;
    }
  },

  /**
   * Calculates progress based on the total hours from all logs
   */
  getProgressData: async (requiredHrs = 300) => {
    const user = auth.currentUser;
    if (!user) return { percentage: 0, rendered: 0, required: requiredHrs, remaining: requiredHrs };

    try {
      const q = query(
        collection(db, 'logs'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const totalHours = querySnapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + (Number(data.hours) || 0);
      }, 0);

      const percentage = Math.min(100, Math.round((totalHours / requiredHrs) * 100));
      
      return {
        percentage,
        rendered: totalHours,
        required: requiredHrs,
        remaining: Math.max(0, requiredHrs - totalHours)
      };
    } catch (error) {
      console.error("Error calculating progress:", error);
      return { percentage: 0, rendered: 0, required: requiredHrs, remaining: requiredHrs };
    }
  }
};

/**
 * Helper to extract day and month from a date string for the UI tiles
 */
function formatDateFields(dateString) {
  try {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  } catch (e) {
    return { day: '?', month: '???' };
  }
}

export default logService;
