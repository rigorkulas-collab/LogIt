import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

/**
 * Firebase Authentication Service
 * Handles live user sign-in, registration, and session management.
 */
export const authService = {
  /**
   * Registers a new user and creates their profile in Firestore
   */
  register: async (email, password, profileData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize the user's document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        ...profileData,
        createdAt: new Date().toISOString()
      });

      return {
        id: user.uid,
        email: user.email,
        ...profileData
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  /**
   * Logs in an existing user
   */
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch profile data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: user.uid,
          ...docSnap.data()
        };
      } else {
        return {
          id: user.uid,
          email: user.email,
          name: user.displayName || 'OJT Student'
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Signs out the current user
   */
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  /**
   * Sends a password reset email to the user
   */
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }
};

export default authService;
