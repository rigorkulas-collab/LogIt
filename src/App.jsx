import React, { useState } from 'react'
import Splash from './components/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import HoursTracker from './pages/Hours/HoursTracker'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD, HOURS
  const [user, setUser] = useState(null);

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

  const navigateToTab = (tabId) => {
    if (tabId === 'home') setAppState('DASHBOARD');
    if (tabId === 'hours') setAppState('HOURS');
    // logs and profile can be added later
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
        />
      )}

      {appState === 'HOURS' && (
        <HoursTracker 
          onBack={() => setAppState('DASHBOARD')} 
          onTabChange={navigateToTab}
        />
      )}
    </div>
  )
}

export default App
