import { useEffect, useState } from 'react';
import api from './axios';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchAllBookings = async () => {
    try {
      const response = await api.get('/api/bookings/');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookings/${id}/`);
      fetchAllBookings(); // Refresh after deletion
    } catch (err) {
      alert('Failed to delete booking.');
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="section">
      <h2>All Bookings (Admin)</h2>
      {error && <p className="error">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.room}</strong><br />
              User: {b.user}<br />
              Date: {b.date} at {b.time}<br />
              Purpose: {b.purpose}<br />
              <button onClick={() => handleDelete(b.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminBookings;
