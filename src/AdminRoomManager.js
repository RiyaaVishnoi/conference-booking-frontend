import { useEffect, useState } from 'react';
import api from './axios';

function AdminRoomManager() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', capacity: '' });
  const [editId, setEditId] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms/');
      setRooms(response.data);
    } catch (err) {
      console.error('Failed to fetch rooms');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/rooms/${editId}/`, form);
      } else {
        await api.post('/rooms/', form);
      }
      setForm({ name: '', location: '', capacity: '' });
      setEditId(null);
      fetchRooms();
    } catch (err) {
      console.error('Failed to save room');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/rooms/${id}/`);
      fetchRooms();
    } catch (err) {
      console.error('Failed to delete room');
    }
  };

  const handleEdit = (room) => {
    setEditId(room.id);
    setForm({ name: room.name, location: room.location, capacity: room.capacity });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="section">
      <h2>Manage Rooms (Admin)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Update Room' : 'Add Room'}</button>
      </form>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> - {room.location} (Capacity: {room.capacity})
            <br />
            <button onClick={() => handleEdit(room)}>Edit</button>
            <button onClick={() => handleDelete(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminRoomManager;
