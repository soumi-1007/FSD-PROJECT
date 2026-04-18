import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import QuestionUpload from './components/QuestionUpload';
import TestAssignment from './components/TestAssignment';
import PerformanceTracking from './components/PerformanceTracking';

const TeacherDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>Teacher Portal</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '2rem', wordBreak: 'break-all' }}>
          {user?.data?.email}
        </p>
        <div className="nav-links">
          <div 
            className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Notes
          </div>
          <div 
            className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Assign Tests
          </div>
          <div 
            className={`nav-link ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Track Performance
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="header">
          <h2>Dashboard Overview</h2>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>

        {/* Dynamic Module Rendering */}
        {activeTab === 'upload' && <QuestionUpload />}
        {activeTab === 'tests' && <TestAssignment />}
        {activeTab === 'performance' && <PerformanceTracking />}
      </div>
    </div>
  );
};

export default TeacherDashboard;
