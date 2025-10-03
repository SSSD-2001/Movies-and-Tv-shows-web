import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import backgroundImage from '../assets/BG1.jpg'; 

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let userData;
      
      if (isRegistering) {
        if (!email || !username || !password) {
          setError('Please fill in all fields');
          return;
        }
        userData = await register(username, email, password);
        
        // Check if registered user is admin
        if (userData.user && userData.user.role === 'admin') {
          setSuccess(`✅ Admin account created successfully! Welcome, ${username}!`);
        } else {
          setSuccess(`✅ User account created successfully! Welcome, ${username}!`);
        }
      } else {
        if (!username || !password) {
          setError('Please fill in all fields');
          return;
        }
        
        userData = await login(username, password);
        
        // Check if user role matches login type
        if (loginType === 'admin' && userData.user.role !== 'admin') {
          setError('❌ Access Denied: You are not authorized as an admin. Only specific email addresses can access admin features.');
          return;
        }
        
        if (loginType === 'admin' && userData.user.role === 'admin') {
          setSuccess(`✅ Admin login successful! Welcome, ${username}!`);
        }
      }
      
      // Store user data in localStorage
      console.log('🔍 Saving userData to localStorage:', userData.user);
      localStorage.setItem('userData', JSON.stringify(userData.user));
      
      // Debug: Verify what was saved
      const savedData = JSON.parse(localStorage.getItem('userData') || '{}');
      console.log('✅ Verified saved userData:', savedData);
      
      // Login successful
      setIsLoggedIn(userData.token);
      
      // Navigate based on login type
      if (loginType === 'admin' && userData.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Authentication failed');
    }
  };

  return (
    
    <div className="login-container">
      <h2>{isRegistering ? 'Register Account' : 'Login to Popcorn Tales'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      {!isRegistering && (
        <div className="login-type-selection">
          <h4>Login as:</h4>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="loginType"
                value="user"
                checked={loginType === 'user'}
                onChange={(e) => setLoginType(e.target.value)}
              />
              <span className="radio-label">🎬 Regular User</span>
              <small className="text-muted d-block">Browse and enjoy movies & TV shows</small>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="loginType"
                value="admin"
                checked={loginType === 'admin'}
                onChange={(e) => setLoginType(e.target.value)}
              />
              <span className="radio-label">⚙️ Administrator</span>
              <small className="text-muted d-block">Manage movies, TV shows and content</small>
            </label>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        {isRegistering && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        
        <p className="mt-3">
          {isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}
          <button 
            type="button" 
            className="btn btn-link p-0" 
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;