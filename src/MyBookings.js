import { useEffect, useState } from 'react';
import api from './axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [editBooking, setEditBooking] = useState(null);
  const [form, setForm] = useState({ date: '', time: '', purpose: '' });

  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings/', {
        headers: { Authorization: `Token ${token}` },
      });
      setBookings(response.data);
    } catch {
      setError('Failed to load bookings.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/api/bookings/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchBookings(); // refresh list
    } catch {
      alert('Failed to cancel booking.');
    }
  };

  const handleEdit = (booking) => {
    setEditBooking(booking);
    setForm({
      date: booking.date,
      time: booking.time,
      purpose: booking.purpose,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/bookings/${editBooking.id}/`, {
        room: editBooking.room, // keep same room
        date: form.date,
        time: form.time,
        purpose: form.purpose,
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      setEditBooking(null);
      fetchBookings();
    } catch {
      alert('Failed to update booking.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>My Bookings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((b) => (
            <li key={b.id} style={{ marginBottom: '15px' }}>
              <strong>{b.room}</strong><br />
              Date: {b.date}<br />
              Time: {b.time}<br />
              Purpose: {b.purpose}<br />
              <button onClick={() => handleCancel(b.id)}>Cancel</button>{' '}
              <button onClick={() => handleEdit(b)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {editBooking && (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Booking for {editBooking.room}</h3>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          /><br /><br />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          /><br /><br />
          <textarea
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            required
          /><br /><br />
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditBooking(null)} type="button">Cancel</button>
        </form>
      )}
    </div>
  );
}

export default MyBookings;
