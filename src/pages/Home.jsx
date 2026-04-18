import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="portal-wrapper">
      <h1>Education Portal</h1>
      <p style={{ color: 'var(--border)', marginTop: '-10px' }}>Select your portal to continue</p>
      
      <div className="home-cards">
        <div className="card" onClick={() => navigate('/teacher/auth')}>
          <h2>Teacher Module</h2>
          <p>Login to manage questions, assign tests, and track student performance.</p>
        </div>
        
        <div className="card" onClick={() => navigate('/student/auth')}>
          <h2>Student Module</h2>
          <p>Login to access study notes, take tests, and view your progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
