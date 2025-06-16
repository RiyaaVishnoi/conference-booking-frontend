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
    const response = await api.post('/api/auth/token/login/', {
      username,
      password,
    });

    localStorage.setItem('token', response.data.token); // correct key now
    localStorage.setItem('is_staff', response.data.is_staff); //  store admin status
    localStorage.setItem('username', response.data.username);

    onLogin(); // Notify App to switch view
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
