import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isLoggedIn = !!localStorage.getItem('token');
  
  // Admin emails list (same as backend)
  const ADMIN_EMAILS = [
    'admin@popcorntales.com',
    'admin@gmail.com',
    'superadmin@popcorntales.com'
  ];
  
  // Debug logging
  console.log('🔍 ProtectedAdminRoute Debug:');
  console.log('isLoggedIn:', isLoggedIn);
  console.log('userData:', userData);
  console.log('userData.role:', userData.role);
  console.log('userData.email:', userData.email);
  
  // Check if user is logged in
  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">
          <h3>🔐 Access Denied</h3>
          <p>You must be logged in to access this page.</p>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }
  
  // Check if user has admin role OR admin email (fallback check)
  const isAdminByRole = userData.role === 'admin';
  const isAdminByEmail = userData.email && ADMIN_EMAILS.includes(userData.email.toLowerCase());
  const isAdmin = isAdminByRole || isAdminByEmail;
  
  console.log('🔍 Admin Check Results:');
  console.log('isAdminByRole:', isAdminByRole);
  console.log('isAdminByEmail:', isAdminByEmail);
  console.log('Final isAdmin:', isAdmin);
  
  if (!isAdmin) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h3>⚠️ Admin Access Required</h3>
          <p>You do not have administrator privileges to access this page.</p>
          <p className="text-muted">
            Only users with admin email addresses can access the admin panel.
          </p>
          <div className="mt-3">
            <a href="/" className="btn btn-primary me-2">Go Home</a>
            <a href="/login" className="btn btn-outline-secondary">Login as Admin</a>
          </div>
        </div>
      </div>
    );
  }
  
  // User is admin, allow access
  return children;
};

export default ProtectedAdminRoute;