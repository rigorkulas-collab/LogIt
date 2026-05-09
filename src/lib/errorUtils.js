/**
 * Translates cryptic Firebase error codes into user-friendly messages.
 */
export const getFriendlyErrorMessage = (error) => {
  if (!error) return "An unknown error occurred.";
  
  const code = error.code || error.message || "";

  // Auth Errors
  if (code.includes('auth/invalid-email')) {
    return "The email address you entered isn't valid.";
  }
  if (code.includes('auth/user-not-found') || 
      code.includes('auth/wrong-password') || 
      code.includes('auth/invalid-credential')) {
    return "Invalid email or password. Please check your credentials.";
  }
  if (code.includes('auth/email-already-in-use')) {
    return "This email is already registered. Try logging in instead.";
  }
  if (code.includes('auth/weak-password')) {
    return "Your password is too weak. Please use at least 6 characters.";
  }
  if (code.includes('auth/network-request-failed')) {
    return "Connection failed. Please check your internet and try again.";
  }
  if (code.includes('auth/too-many-requests')) {
    return "Too many failed attempts. Please try again later.";
  }

  // Firestore / General Errors
  if (code.includes('permission-denied')) {
    return "You don't have permission to perform this action.";
  }
  if (code.includes('unavailable')) {
    return "The service is temporarily unavailable. Please try again later.";
  }

  // Default fallback
  return "Unable to complete request. Please try again.";
};
