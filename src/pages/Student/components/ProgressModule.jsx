import React from 'react';

const ProgressModule = () => {
  // Static performance summary using mock calculation
  const overallProgress = 78;
  const assignmentsCompleted = 12;
  const totalAssignments = 15;

  return (
    <div className="module-card">
      <h2>My Performance Summary</h2>
      
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)' }}>Course Progress</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{overallProgress}%</div>
          <div style={{ width: '100%', background: 'var(--border)', borderRadius: '4px', height: '8px', overflow: 'hidden', marginTop: '1rem' }}>
            <div style={{ width: `${overallProgress}%`, background: 'var(--primary)', height: '100%' }}></div>
          </div>
        </div>

        <div style={{ flex: '1 1 200px', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-color)' }}>Assignments</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {assignmentsCompleted}<span style={{fontSize: '1.5rem', color: 'var(--border)'}}>/{totalAssignments}</span>
          </div>
          <p style={{ color: 'var(--text-color)', margin: '1rem 0 0 0', opacity: 0.8 }}>Tasks Completed</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressModule;
