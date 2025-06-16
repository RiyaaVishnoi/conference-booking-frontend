import { useEffect, useState } from 'react';
import api from './axios';

function AdminReserveForm() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    user: '',
    room: '',
    date: '',
    time: '',
    purpose: ''
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/api/users/');
        setUsers(res.data);
      } catch {
        console.error("Failed to load users");
      }
    };
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/rooms/');
        setRooms(res.data);
      } catch {
        console.error("Failed to load rooms");
      }
    };
    fetchUsers();
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    const { user, room, date, time, purpose } = form;

    const payload = {
      user: parseInt(user),
      room: parseInt(room),
      date,
      time,
      purpose
    };

    console.log('Submitting form:', payload);

    try {
      await api.post('/api/bookings/', payload);
      setForm({ user: '', room: '', date: '', time: '', purpose: '' });
      setSuccess('✅ Booking created for user!');
    } catch (err) {
      alert("❌ Failed to book for user.");
      console.error(err);
    }
  };

  return (
    <div className="section">
      <h3>📅 Admin Reserve for Users</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
          required
        >
          <option value="">-- Select User --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>

        <select
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          required
        >
          <option value="">-- Select Room --</option>
          {rooms.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />

        <textarea
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <button type="submit">Book for User</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default AdminReserveForm;
