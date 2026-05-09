import React, { useState } from 'react'
import Splash from './components/Splash/Splash'
import Login from './pages/Login/Login'
import './index.css'

function App() {
  const [appState, setAppState] = useState('SPLASH'); // SPLASH, LOGIN, DASHBOARD
  const [user, setUser] = useState(null);

  const handleSplashComplete = () => {
    setAppState('LOGIN');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setAppState('DASHBOARD');
  };

  return (
    <div className="App">
      {appState === 'SPLASH' && (
        <Splash onComplete={handleSplashComplete} />
      )}

      {appState === 'LOGIN' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {appState === 'DASHBOARD' && (
        <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', textAlign: 'center', padding: '20px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-deep)' }}>
            Welcome, {user?.name}!
          </h2>
          <p style={{ color: '#6B7280', marginTop: '16px', maxWidth: '300px' }}>
            You have successfully logged in to LogItV2. The Dashboard implementation is next!
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
