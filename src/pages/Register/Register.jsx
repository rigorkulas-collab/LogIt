import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import './Register.css';

/**
 * Register Page Component
 * Multi-field form for user registration with full-page scrolling.
 */
const Register = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    otherSchool: '',
    company: '',
    hours: '300'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSuccess();
  };

  const schools = [
    { value: 'pup', label: 'Polytechnic University of the Philippines' },
    { value: 'ust', label: 'University of Santo Tomas' },
    { value: 'dlsu', label: 'De La Salle University' },
    { value: 'up', label: 'University of the Philippines' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="register-page">
      {/* Header */}
      <div className="register-header">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Start tracking your OJT journey</p>
      </div>

      {/* Form Panel */}
      <div className="register-form-panel">
        <form onSubmit={handleSubmit} className="register-form">
          <Input
            label="Full Name"
            placeholder="Juan dela Cruz"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="juan@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Select
            label="School / University"
            placeholder="Select your school"
            options={schools}
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />

          {formData.school === 'other' && (
            <Input
              label="Specify School"
              placeholder="Enter your school name"
              name="otherSchool"
              value={formData.otherSchool}
              onChange={handleChange}
              required
            />
          )}

          <Input
            label="OJT Company Name"
            placeholder="Acme Corp Philippines"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <Input
            label="Required OJT Hours"
            type="number"
            placeholder="300"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            required
          />

          <Button type="submit" loading={loading} className="register-submit">
            Create Account
          </Button>

          <p className="register-footer">
            Already have an account? <button type="button" className="text-link bold" onClick={onBackToLogin}>Log In</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
