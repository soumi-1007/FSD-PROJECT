import React, { useState, useEffect } from 'react';
import { addTest, getTests, deleteTest } from '../../../utils/storage';

const TestAssignment = () => {
  const [testData, setTestData] = useState({ title: '', duration: '', questions: [] });
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correctOption: 0 });
  const [scheduledTests, setScheduledTests] = useState([]);

  useEffect(() => {
    setScheduledTests(getTests());
  }, []);

  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.options.every(opt => opt)) {
      setTestData({
        ...testData,
        questions: [...testData.questions, newQuestion]
      });
      setNewQuestion({ text: '', options: ['', '', '', ''], correctOption: 0 });
    } else {
      alert("Please fill in question text and all 4 options.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testData.questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }
    const updated = addTest(testData);
    setScheduledTests(updated);
    alert(`Test "${testData.title}" created and assigned successfully!`);
    setTestData({ title: '', duration: '', questions: [] });
  };

  const handleDelete = (id) => {
    const updated = deleteTest(id);
    setScheduledTests(updated);
  };

  return (
    <div className="module-card">
      <h2>Create & Assign Test</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Creation Form */}
        <form onSubmit={handleSubmit} className="glass" style={{ padding: '1.5rem', borderRadius: '12px' }}>
          <div className="form-group">
            <label>Test Title</label>
            <input 
              type="text" 
              value={testData.title} 
              onChange={(e) => setTestData({...testData, title: e.target.value})} 
              required 
              placeholder="e.g. Physics Quiz - Semester 1"
            />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input 
              type="number" 
              value={testData.duration} 
              onChange={(e) => setTestData({...testData, duration: e.target.value})} 
              required 
              min="1"
            />
          </div>

          <div style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <h4>Add Question</h4>
            <div className="form-group">
              <textarea 
                placeholder="Question text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                style={{ marginBottom: '0.5rem' }}
              />
              {newQuestion.options.map((opt, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="radio" 
                    name="correct" 
                    checked={newQuestion.correctOption === i}
                    onChange={() => setNewQuestion({...newQuestion, correctOption: i})}
                  />
                  <input 
                    type="text" 
                    placeholder={`Option ${i+1}`}
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...newQuestion.options];
                      newOpts[i] = e.target.value;
                      setNewQuestion({...newQuestion, options: newOpts});
                    }}
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddQuestion} className="btn-primary" style={{ width: 'auto', backgroundColor: 'var(--accent)' }}>
              Add Question
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <p>Questions Added: {testData.questions.length}</p>
            <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--success)' }}>
              Create & Assign Test
            </button>
          </div>
        </form>

        {/* List of Existing Tests */}
        <div>
          <h3>Live Tests</h3>
          <div className="data-list" style={{ marginTop: '1rem' }}>
            {scheduledTests.map(test => (
              <div key={test.id} className="data-item">
                <div>
                  <strong>{test.title}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{test.questions.length} Questions | {test.duration} mins</div>
                </div>
                <button onClick={() => handleDelete(test.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
            {scheduledTests.length === 0 && <p style={{ fontStyle: 'italic', color: '#94A3B8' }}>No tests created yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAssignment;
