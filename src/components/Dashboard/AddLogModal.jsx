import React, { useState } from 'react';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './AddLogModal.css';

/**
 * Add Log Modal Component
 * Form for creating a new OJT log entry.
 */
const AddLogModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    hours: 8,
    date: new Date().toISOString().split('T')[0],
    mood: 'Happy',
    moodEmoji: '😄'
  });

  const moods = [
    { label: 'Happy', emoji: '😄' },
    { label: 'Neutral', emoji: '😐' },
    { label: 'Tired', emoji: '😫' },
    { label: 'Productive', emoji: '🔥' },
    { label: 'Focused', emoji: '🎯' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // Reset form
    setFormData({
      title: '',
      hours: 8,
      date: new Date().toISOString().split('T')[0],
      mood: 'Happy',
      moodEmoji: '😄'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New OJT Log">
      <form onSubmit={handleSubmit} className="add-log-form">
        <Input
          label="Activity Description"
          placeholder="What did you do today?"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div className="form-row">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <Input
            label="Hours"
            type="number"
            min="1"
            max="24"
            value={formData.hours}
            onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="mood-selection">
          <label className="input-label">How are you feeling?</label>
          <div className="mood-grid">
            {moods.map((m) => (
              <button
                key={m.label}
                type="button"
                className={`mood-btn ${formData.mood === m.label ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, mood: m.label, moodEmoji: m.emoji })}
              >
                <span className="mood-emoji">{m.emoji}</span>
                <span className="mood-label">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="submit-log-btn">
          Create Log Entry
        </Button>
      </form>
    </Modal>
  );
};

export default AddLogModal;
