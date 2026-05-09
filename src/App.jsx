import React, { useState } from 'react'
import Splash from './components/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD
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
        <Dashboard user={user} />
      )}
    </div>
  )
}

export default App
