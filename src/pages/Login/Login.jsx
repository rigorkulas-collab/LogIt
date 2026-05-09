import React, { useState } from 'react';
import { LogoIcon } from '../../components/Icons/Logo';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import authService from '../../services/authService';
import './Login.css';

/**
 * Login Page Component
 * Features a high-fidelity mobile-first layout with smooth transitions.
 */
const Login = ({ onLoginSuccess, onRegisterClick, onForgotClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await authService.login(email, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Top Section: Blue Header */}
      <div className="login-header">
        <div className="login-branding">
          <div className="logo-container minimized">
            <LogoIcon size={60} className="login-logo" />
          </div>
          <h1 className="login-title">LogIt</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
      </div>

      {/* Bottom Section: White Form Panel */}
      <div className="login-form-panel">
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <Input
            label="Email Address"
            type="email"
            placeholder="student@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-extra">
            <button type="button" className="text-link" onClick={onForgotClick}>Forgot Password?</button>
          </div>

          <Button type="submit" loading={loading} className="login-submit">
            Sign In
          </Button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <p className="login-footer">
            Don't have an account? <button type="button" className="text-link bold" onClick={onRegisterClick}>Register</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
