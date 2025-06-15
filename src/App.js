import { useState } from 'react';
import Login from './Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>Conference Room Booking</h1>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <p>You are logged in! ✅</p>
      )}
    </div>
  );
}

export default App;
