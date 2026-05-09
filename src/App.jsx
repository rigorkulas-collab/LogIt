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
import logService from './services/logService'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD, HOURS, LOGS, PROFILE
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          onLogout={handleLogout}
          onTabChange={navigateToTab}
          onFabClick={() => setIsModalOpen(true)}
        />
      )}

      {/* Global Modal */}
      <AddLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddLog} 
      />
    </div>
  )
}

export default App
