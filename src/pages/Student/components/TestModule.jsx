import React, { useState, useEffect, useContext } from 'react';
import { getTests, saveResult, getResultsByStudent } from '../../../utils/storage';
import { AuthContext } from '../../../App';

const TestModule = () => {
  const { user } = useContext(AuthContext);
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [activeTest, setActiveTest] = useState(null); // The test currently being taken
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTests(getTests());
    setResults(getResultsByStudent(user?.data?.email));
  }, [user]);

  // Timer logic
  useEffect(() => {
    if (activeTest && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (activeTest && timeLeft === 0) {
      handleSubmitTest();
    }
  }, [activeTest, timeLeft]);

  const startTest = (test) => {
    setActiveTest(test);
    setTimeLeft(test.duration * 60);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleSubmitTest = () => {
    let score = 0;
    activeTest.questions.forEach((q, index) => {
      if (answers[index] === q.correctOption) score++;
    });

    const finalScore = Math.round((score / activeTest.questions.length) * 100);
    const result = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      studentEmail: user?.data?.email,
      score: finalScore,
      completedAt: new Date().toISOString()
    };

    saveResult(result);
    setResults(getResultsByStudent(user?.data?.email));
    setActiveTest(null);
    alert(`Test Submitted! Your score: ${finalScore}%`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (activeTest) {
    const question = activeTest.questions[currentQuestionIndex];
    return (
      <div className="module-card glass" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>{activeTest.title}</h2>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: timeLeft < 60 ? 'var(--error)' : 'var(--primary)' }}>
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Question {currentQuestionIndex + 1} of {activeTest.questions.length}</h3>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{question.text}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {question.options.map((opt, i) => (
              <label key={i} className="data-item" style={{ cursor: 'pointer', border: answers[currentQuestionIndex] === i ? '2px solid var(--primary)' : '1px solid var(--border)' }}>
                <input 
                  type="radio" 
                  name="q-opt" 
                  checked={answers[currentQuestionIndex] === i}
                  onChange={() => setAnswers({...answers, [currentQuestionIndex]: i})}
                  style={{ marginRight: '1rem' }}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            disabled={currentQuestionIndex === 0} 
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className="btn-primary" 
            style={{ width: 'auto', opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          
          {currentQuestionIndex < activeTest.questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="btn-primary" 
              style={{ width: 'auto' }}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmitTest}
              className="btn-primary" 
              style={{ width: 'auto', backgroundColor: 'var(--success)' }}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="module-card">
      <h2>Available Tests</h2>
      <div style={{ marginTop: '1.5rem' }}>
        <div className="data-list">
          {tests.map(test => {
            const result = results.find(r => r.testId === test.id);
            return (
              <div key={test.id} className="data-item">
                <div>
                  <strong>{test.title}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{test.duration} mins | {test.questions.length} Questions</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {result ? (
                    <span className="status-badge badge-success">Completed: {result.score}%</span>
                  ) : (
                    <button onClick={() => startTest(test)} className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                      Attempt Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {tests.length === 0 && <p style={{ fontStyle: 'italic', color: '#94A3B8', textAlign: 'center', padding: '2rem' }}>No tests assigned by your teacher yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default TestModule;
