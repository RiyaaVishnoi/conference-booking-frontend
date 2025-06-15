import { useState } from 'react';
import api from './axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/token/login/', {
        username,
        password,
      });

      const token = response.data.auth_token;
      localStorage.setItem('token', token); // Save token in browser
      onLogin(); // Notify App
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Log In</button>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
    </div>
  );
}

export default Login;
