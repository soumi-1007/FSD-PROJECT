import React, { useState } from 'react';
import { mockTests } from '../../../utils/mockData';

const TestModule = () => {
  const [tests, setTests] = useState(mockTests);

  const handleAttempt = (testId) => {
    alert(`Starting test ID: ${testId}`);
    // Simulate test completion
    setTests(tests.map(t => t.id === testId ? { ...t, status: 'Completed', score: Math.floor(Math.random() * 40) + 60 } : t));
  };

  return (
    <div className="module-card">
      <h2>Available Tests & Quizzes</h2>
      <div style={{ marginTop: '1.5rem' }}>
        <ul className="data-list">
          <li className="data-item" style={{ backgroundColor: 'var(--surface)', fontWeight: 'bold' }}>
            <span style={{flex: 2}}>Test Title</span>
            <span style={{flex: 1}}>Status</span>
            <span style={{flex: 1, textAlign: 'right'}}>Action / Score</span>
          </li>
          {tests.map(test => (
            <li key={test.id} className="data-item">
              <span style={{flex: 2}}>{test.title}</span>
              <span style={{flex: 1}}>
                <span className={`status-badge ${test.status === 'Completed' ? 'badge-success' : ''}`}>
                  {test.status}
                </span>
              </span>
              <span style={{flex: 1, textAlign: 'right'}}>
                {test.status === 'Completed' ? (
                  <strong>{test.score}%</strong>
                ) : (
                  <button className="btn-primary" style={{ padding: '0.4rem 1rem', width: 'auto' }} onClick={() => handleAttempt(test.id)}>Attempt</button>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestModule;
