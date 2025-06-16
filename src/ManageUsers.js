import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/users/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/users/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId)); // update UI
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleAdmin = async (user) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/users/${user.id}/`, {
        ...user,
        is_staff: !user.is_staff,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      fetchUsers(); // refresh list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_staff ? 'Admin' : 'User'}</td>
              <td>
                <button onClick={() => toggleAdmin(user)}>
                  {user.is_staff ? 'Revoke Admin' : 'Make Admin'}
                </button>
                <button onClick={() => deleteUser(user.id)} style={{ marginLeft: '8px' }}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
