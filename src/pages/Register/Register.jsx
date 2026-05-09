import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import authService from '../../services/authService';
import './Register.css';

const Register = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    otherSchool: '',
    company: '',
    position: '',
    supervisor: '',
    batch: '2025-2026',
    requiredHrs: '300',
    startDate: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { email, password, ...profileFields } = formData;
      // Map fullName to name for profileData consistency
      const profileData = {
        name: profileFields.fullName,
        ...profileFields
      };
      
      await authService.register(email, password, profileData);
      onRegisterSuccess();
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
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
          {error && <div className="register-error" style={{ color: '#DC2626', background: '#FEF2F2', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.875rem', fontWeight: '600', textAlign: 'center' }}>{error}</div>}
          
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
            label="Designated Position"
            placeholder="e.g. Frontend Developer Intern"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <Input
            label="OJT Supervisor"
            placeholder="e.g. Engr. Robert Santos"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <Input
              label="Required Hrs"
              type="number"
              placeholder="300"
              name="requiredHrs"
              value={formData.requiredHrs}
              onChange={handleChange}
              required
            />
            <Input
              label="School Batch"
              placeholder="2025-2026"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="OJT Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
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
