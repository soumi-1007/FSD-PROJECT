import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import NotesModule from './components/NotesModule';
import TestModule from './components/TestModule';
import ProgressModule from './components/ProgressModule';

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('notes');

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>Student Portal</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '2rem', wordBreak: 'break-all' }}>
          {user?.data?.email}
        </p>
        <div className="nav-links">
          <div 
            className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Study Notes
          </div>
          <div 
            className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Take Tests
          </div>
          <div 
            className={`nav-link ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            My Progress
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
        {activeTab === 'notes' && <NotesModule />}
        {activeTab === 'tests' && <TestModule />}
        {activeTab === 'progress' && <ProgressModule />}
      </div>
    </div>
  );
};

export default StudentDashboard;
