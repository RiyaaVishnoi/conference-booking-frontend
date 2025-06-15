import { useEffect, useState } from 'react';
import api from './axios';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/rooms/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setRooms(response.data);
      } catch (err) {
        setError('Failed to load rooms.');
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="section">
      <h2>Available Rooms</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong><br />
            Location: {room.location}<br />
            Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
