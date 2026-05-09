import React, { useState } from 'react'
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
import logService from './services/logService'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD, HOURS, LOGS, PROFILE
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    school: "Far Eastern University",
    company: "Acme Corp Philippines",
    position: "UI/UX Design Intern",
    requiredHrs: "300",
    supervisor: "Ms. Maria Santos",
    startDate: "2026-02-01",
    batch: "2026",
    avatarUrl: null
  });

  const handleSplashComplete = () => {
    setAppState('LOGIN');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setAppState('DASHBOARD');
  };

  const handleRegisterSuccess = () => {
    setAppState('LOGIN');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('LOGIN');
  };

  const handleUpdateProfile = (newData) => {
    setProfileData(newData);
    setIsEditModalOpen(false);
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

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        profileData={profileData}
        onUpdate={handleUpdateProfile}
      />
    </div>
  )
}

export default App
