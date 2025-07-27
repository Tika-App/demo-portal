import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import UploadEntry from './components/UploadEntry';
import MyUploads from './components/MyUploads';
import AuditLog from './components/AuditLog';
import Reports from './components/Reports';
import Profile from './components/Profile';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleLogin = (email, password) => {
    // Mock authentication
    if (email && password) {
      setIsAuthenticated(true);
      setShowTwoFactor(false);
    }
  };

  const handleTwoFactor = (code) => {
    // Mock 2FA verification
    if (code === '123456') {
      setIsAuthenticated(true);
      setShowTwoFactor(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowTwoFactor(false);
  };

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={handleLogin}
        showTwoFactor={showTwoFactor}
        onTwoFactor={handleTwoFactor}
        setShowTwoFactor={setShowTwoFactor}
      />
    );
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/upload" element={<UploadEntry />} />
          <Route path="/my-uploads" element={<MyUploads />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 