import { useState } from 'react';
import Login from './Login';
import RoomList from './RoomList';
import BookingForm from './BookingForm';
import MyBookings from './MyBookings';

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
        <>
          <p>You are logged in! ✅</p>
          <button onClick={() => {
          localStorage.removeItem('token');
          window.location.reload(); // resets React state
          }}>
            Logout
          </button>
          <RoomList />
          <BookingForm />
          <MyBookings />
        </>
      )}
    </div>
  );
}

export default App;
