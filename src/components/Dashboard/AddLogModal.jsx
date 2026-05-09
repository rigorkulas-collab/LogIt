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
    startTime: '09:00',
    endTime: '18:00',
    date: new Date().toISOString().split('T')[0],
    mood: 'Happy',
    moodEmoji: '😄'
  });

  const calculateHours = (start, end) => {
    if (!start || !end) return 0;
    const s = start.split(':').map(Number);
    const e = end.split(':').map(Number);
    
    let diffMinutes = (e[0] * 60 + e[1]) - (s[0] * 60 + s[1]);
    
    // Standard 1-hour lunch deduction if shift is 5 hours or more
    if (diffMinutes >= 300) {
      diffMinutes -= 60;
    }
    
    return Math.max(0, diffMinutes / 60);
  };

  const moods = [
    { label: 'Happy', emoji: '😄' },
    { label: 'Neutral', emoji: '😐' },
    { label: 'Tired', emoji: '😫' },
    { label: 'Productive', emoji: '🔥' },
    { label: 'Focused', emoji: '🎯' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedHours = calculateHours(formData.startTime, formData.endTime);
    onAdd({
      ...formData,
      hours: calculatedHours
    });
    // Reset form
    setFormData({
      title: '',
      startTime: '09:00',
      endTime: '18:00',
      date: new Date().toISOString().split('T')[0],
      mood: 'Happy',
      moodEmoji: '😄'
    });
  };

  const calculatedHours = calculateHours(formData.startTime, formData.endTime);

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
        </div>

        <div className="form-row">
          <Input
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
          <Input
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>

        <div className="calculation-preview">
          <span>Total Hours: <strong>{calculatedHours} hrs</strong></span>
          {calculatedHours >= 4 && <span className="lunch-note">(1 hr lunch deducted)</span>}
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
