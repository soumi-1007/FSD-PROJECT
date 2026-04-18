import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TeacherAuth from './pages/Teacher/TeacherAuth';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentAuth from './pages/Student/StudentAuth';
import StudentDashboard from './pages/Student/StudentDashboard';

// Export AuthContext to use globally
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null); // { role: 'teacher' | 'student', data: {} }

  const login = (role, data) => {
    setUser({ role, data });
  };

  const logout = () => {
    setUser(null);
  };

  // Protective route wrapper
  const RequireAuth = ({ children, requiredRole }) => {
    if (!user || user.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher/auth" element={<TeacherAuth />} />
          <Route path="/student/auth" element={<StudentAuth />} />
          
          <Route 
            path="/teacher/dashboard/*" 
            element={
              <RequireAuth requiredRole="teacher">
                <TeacherDashboard />
              </RequireAuth>
            } 
          />
          
          <Route 
            path="/student/dashboard/*" 
            element={
              <RequireAuth requiredRole="student">
                <StudentDashboard />
              </RequireAuth>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
