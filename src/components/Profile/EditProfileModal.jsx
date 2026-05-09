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

  if (!formData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <Input
          label="School"
          name="school"
          value={formData.school}
          onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          required
        />
        
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        />

        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />

        <div className="form-row">
          <Input
            label="Required Hrs"
            name="requiredHrs"
            type="number"
            value={formData.requiredHrs}
            onChange={(e) => setFormData({ ...formData, requiredHrs: e.target.value })}
            required
          />
          <Input
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            required
          />
        </div>

        <Input
          label="Supervisor"
          name="supervisor"
          value={formData.supervisor}
          onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
          required
        />

        <Input
          label="Start Date"
          name="startDate"
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
