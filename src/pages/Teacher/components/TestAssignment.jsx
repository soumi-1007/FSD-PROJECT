import React, { useState } from 'react';

const TestAssignment = () => {
  const [testData, setTestData] = useState({ title: '', duration: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Test "${testData.title}" assigned successfully!`);
    setTestData({ title: '', duration: '', date: '' });
  };

  return (
    <div className="module-card">
      <h2>Test Assignment Module</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>Test Title</label>
          <input 
            type="text" 
            value={testData.title} 
            onChange={(e) => setTestData({...testData, title: e.target.value})} 
            required 
            placeholder="e.g. Midterm Physics Exam"
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input 
            type="number" 
            value={testData.duration} 
            onChange={(e) => setTestData({...testData, duration: e.target.value})} 
            required 
            min="5"
            max="300"
          />
        </div>
        <div className="form-group">
          <label>Scheduled Date</label>
          <input 
            type="date" 
            value={testData.date} 
            onChange={(e) => setTestData({...testData, date: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: 'auto', backgroundColor: 'var(--success)' }}>
          Assign Test
        </button>
      </form>
    </div>
  );
};

export default TestAssignment;
