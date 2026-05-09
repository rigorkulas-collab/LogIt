import React, { useState } from 'react'
import Splash from './components/Splash/Splash'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, REGISTER, DASHBOARD
  const [user, setUser] = useState(null);

  const handleSplashComplete = () => {
    setAppState('LOGIN');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setAppState('DASHBOARD');
  };

  const handleRegisterSuccess = () => {
    // After registration, send them to login
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
        />
      )}

      {appState === 'REGISTER' && (
        <Register 
          onBackToLogin={() => setAppState('LOGIN')} 
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {appState === 'DASHBOARD' && (
        <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', textAlign: 'center', padding: '20px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-deep)' }}>
            Welcome, {user?.name}!
          </h2>
          <p style={{ color: '#6B7280', marginTop: '16px', maxWidth: '300px' }}>
            You have successfully logged in to LogItV2.
          </p>
          <button 
            onClick={() => setAppState('LOGIN')}
            style={{ marginTop: '32px', background: 'none', border: 'none', color: 'var(--primary-deep)', fontWeight: 700, cursor: 'pointer' }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default App
