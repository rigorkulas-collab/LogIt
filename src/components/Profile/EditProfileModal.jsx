import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './EditProfileModal.css';

/**
 * Edit Profile Modal Component
 * Form for updating school, company, and OJT details.
 */
const EditProfileModal = ({ isOpen, onClose, profileData, onUpdate }) => {
  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    setFormData(profileData);
  }, [profileData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <Input
          label="School"
          value={formData.school}
          onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          required
        />
        
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        />

        <Input
          label="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />

        <div className="form-row">
          <Input
            label="Required Hrs"
            type="number"
            value={formData.requiredHrs}
            onChange={(e) => setFormData({ ...formData, requiredHrs: e.target.value })}
            required
          />
          <Input
            label="Batch"
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            required
          />
        </div>

        <Input
          label="Supervisor"
          value={formData.supervisor}
          onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
          required
        />

        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />

        <Button type="submit" className="save-profile-btn">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
