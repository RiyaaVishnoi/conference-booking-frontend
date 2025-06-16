import { useState } from 'react';
import Login from './Login';
import RoomList from './RoomList';
import BookingForm from './BookingForm';
import MyBookings from './MyBookings';
import './App.css';
import AdminBookings from './AdminBookings';
import AdminRoomManager from './AdminRoomManager';
import Register from './Register';
import AdminReserveForm from './AdminReserveForm';
import ManageUsers from './ManageUsers';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showUsers, setShowUsers] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>Conference Room Booking</h1>

      {!loggedIn ? (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p>You are logged in! ✅</p>
            <button onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>
              Logout
            </button>
          </div>

          <RoomList />
          <BookingForm />
          <MyBookings />

          {localStorage.getItem('is_staff') === 'true' && (
            <>
              <AdminBookings />
              <AdminRoomManager />
              <AdminReserveForm />
              <div style={{ margin: '20px 0' }}>
                <button onClick={() => setShowUsers(!showUsers)}>
                  {showUsers ? 'Hide' : 'Show'} Manage Users
                </button>
              </div>
              {showUsers && <ManageUsers />}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;