import React from 'react';
import { mockStudents } from '../../../utils/mockData';

const PerformanceTracking = () => {
  return (
    <div className="module-card">
      <h2>Student Performance Tracking</h2>
      <div style={{ marginTop: '1.5rem' }}>
        <ul className="data-list">
          <li className="data-item" style={{ backgroundColor: 'var(--surface)', fontWeight: 'bold' }}>
            <span style={{flex: 1}}>Student Name</span>
            <span style={{flex: 1}}>Overall Progress</span>
            <span style={{width: '100px', textAlign: 'right'}}>Recent Score</span>
          </li>
          {mockStudents.map(student => (
            <li key={student.id} className="data-item">
              <span style={{flex: 1}}>{student.name}</span>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{ width: '150px', background: 'var(--border)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${student.progress}%`, background: 'var(--primary)', height: '100%' }}></div>
                </div>
                <span style={{fontSize: '0.8rem'}}>{student.progress}%</span>
              </div>
              <span style={{width: '100px', textAlign: 'right'}} className="status-badge badge-success">{student.recentScore}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerformanceTracking;
