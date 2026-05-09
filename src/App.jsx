import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import Splash from './components/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import HoursTracker from './pages/Hours/HoursTracker'
import LogHistory from './pages/Logs/LogHistory'
import Profile from './pages/Profile/Profile'
import AddLogModal from './components/Dashboard/AddLogModal'
import EditProfileModal from './components/Profile/EditProfileModal'
import authService from './services/authService'
import logService from './services/logService'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); 
  const [user, setUser] = useState(null);
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Ensure loading is true while fetching
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            setProfileData({
              name: currentUser.displayName || "OJT Student",
              email: currentUser.email,
              school: "Not Set",
              company: "Not Set",
              requiredHrs: "300",
              batch: "2026",
              avatarUrl: null
            });
          }
        } catch (error) {
          console.error("Firestore error:", error);
          setProfileData({
            name: "OJT Student",
            email: currentUser.email,
            school: "Error Loading",
            company: "Error Loading",
            requiredHrs: "300",
            batch: "---",
            avatarUrl: null
          });
        }
      } else {
        setUser(null);
        setProfileData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Sync Splash and Auth to handle Navigation
  useEffect(() => {
    const checkNavigation = () => {
      if (!loading && isSplashDone) {
        if (user && profileData) {
          setAppState('DASHBOARD');
        } else {
          setAppState('LOGIN');
        }
      }
    };
    checkNavigation();
  }, [loading, isSplashDone, user, profileData]);

  const handleSplashComplete = () => {
    setIsSplashDone(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setAppState('DASHBOARD');
  };

  const handleRegisterSuccess = () => {
    setAppState('LOGIN');
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setAppState('LOGIN');
  };

  const handleUpdateProfile = async (newData) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, newData, { merge: true });
      setProfileData(newData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save profile changes.");
    }
  };

  const handleAddLog = async (newLog) => {
    await logService.addLog(newLog);
    setIsModalOpen(false);
    // We might need a way to refresh children, but for now this handles the save
  };

  const navigateToTab = (tabId) => {
    if (tabId === 'home') setAppState('DASHBOARD');
    if (tabId === 'hours') setAppState('HOURS');
    if (tabId === 'logs') setAppState('LOGS');
    if (tabId === 'profile') setAppState('PROFILE');
  };

  return (
    <div className="App">
      {appState === 'SPLASH' && (
        <Splash onComplete={handleSplashComplete} />
      )}

      {appState === 'LOGIN' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onRegisterClick={() => setAppState('REGISTER')}
          onForgotClick={() => setAppState('FORGOT_PASSWORD')}
        />
      )}

      {appState === 'REGISTER' && (
        <Register 
          onBackToLogin={() => setAppState('LOGIN')} 
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {appState === 'FORGOT_PASSWORD' && (
        <ForgotPassword onBack={() => setAppState('LOGIN')} />
      )}

      {appState === 'DASHBOARD' && (
        <Dashboard 
          user={user} 
          profileData={profileData}
          onTabChange={navigateToTab}
          onFabClick={() => setIsModalOpen(true)}
        />
      )}

      {appState === 'HOURS' && (
        <HoursTracker 
          onBack={() => setAppState('DASHBOARD')} 
          onTabChange={navigateToTab}
          onFabClick={() => setIsModalOpen(true)}
        />
      )}

      {appState === 'LOGS' && (
        <LogHistory 
          onBack={() => setAppState('DASHBOARD')} 
          onTabChange={navigateToTab}
          onFabClick={() => setIsModalOpen(true)}
        />
      )}

      {appState === 'PROFILE' && (
        <Profile 
          user={user} 
          profileData={profileData}
          onLogout={handleLogout}
          onTabChange={navigateToTab}
          onFabClick={() => setIsModalOpen(true)}
          onEdit={() => setIsEditModalOpen(true)}
          onUpdate={handleUpdateProfile}
        />
      )}

      {/* Global Modals */}
      <AddLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddLog} 
      />

      {profileData && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          profileData={profileData}
          onUpdate={handleUpdateProfile}
        />
      )}
    </div>
  )
}

export default App
