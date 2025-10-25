import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL || ''; // if you set proxy, keep empty
  const registerUrl = API_BASE + '/api/auth/register';

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(registerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      // network-level failure will throw and be caught below
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Register failed');
        return;
      }

      // save returned user + token
      localStorage.setItem('userData', JSON.stringify({ ...data.user, token: data.token }));
      navigate('/'); // go home after register
    } catch (err) {
      console.error('Register error', err);
      setError('Network error: could not reach the server. Is the backend running?');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'salmon' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;