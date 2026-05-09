import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import BackButton from '../../components/UI/BackButton';
import lockKeyIcon from '../../assets/lock-key.svg';
import authService from '../../services/authService';
import { getFriendlyErrorMessage } from '../../lib/errorUtils';
import './ForgotPassword.css';

/**
 * Forgot Password Page Component
 * Clean, focused UI for password recovery.
 */
const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.resetPassword(email);
      setIsSent(true);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      {/* Header */}
      <div className="forgot-header">
        <BackButton onClick={onBack} />
        <h1 className="header-title">Forgot Password</h1>
      </div>

      <div className="forgot-content">
        {!isSent ? (
          <div className="forgot-form-container">
            <div className="hero-section">
              <img src={lockKeyIcon} alt="Lock and Key" className="hero-icon" />
            </div>
            
            <div className="text-section">
              <h2 className="content-title">Reset your password</h2>
              <p className="content-subtitle">
                Enter your email and we'll send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form">
              {error && <div className="error-box">{error}</div>}
              <Input
                label="Email Address"
                type="email"
                placeholder="student@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" loading={loading} className="forgot-submit">
                Send Reset Link
              </Button>
            </form>
          </div>
        ) : (
          <div className="success-container">
            <div className="success-icon-wrapper">
              <CheckCircle size={80} color="var(--accent-green)" />
            </div>
            <h2 className="content-title">Email Sent!</h2>
            <p className="content-subtitle">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Button onClick={onBack} className="back-to-login-btn">
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
