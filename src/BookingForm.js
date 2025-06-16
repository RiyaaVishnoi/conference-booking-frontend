import { useState, useEffect } from 'react';
import api from './axios';

function BookingForm() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/rooms/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setRooms(response.data);
      } catch (err) {
        console.error('Failed to fetch rooms');
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await api.post('/api/bookings/', {
        room,
        date,
        time,
        purpose,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setMessage('Booking successful!');
      setRoom('');
      setDate('');
      setTime('');
      setPurpose('');
    } catch (err) {
      setError('Failed to book. Check inputs or try a different time.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <select value={room} onChange={(e) => setRoom(e.target.value)} required>
          <option value="">-- Select Room --</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select><br /><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required /><br /><br />
        <textarea placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} required /><br /><br />
        <button type="submit">Book Room</button>
        <p style={{ color: 'green' }}>{message}</p>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
    </div>
  );
}

export default BookingForm;
