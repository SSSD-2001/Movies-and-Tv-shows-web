import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import backgroundImage from '../assets/BG1.jpg'; 

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userData;
      
      if (isRegistering) {
        if (!email || !username || !password) {
          setError('Please fill in all fields');
          return;
        }
        userData = await register(username, email, password);
      } else {
        if (!username || !password) {
          setError('Please fill in all fields');
          return;
        }
        userData = await login(username, password);
      }
      
      // Login successful
      setIsLoggedIn(userData.token);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Authentication failed');
    }
  };

  return (
    
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p className="text-danger">{error}</p>}
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