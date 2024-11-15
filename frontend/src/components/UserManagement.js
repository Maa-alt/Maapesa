// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch users from the server
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error adding user');
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, password: '' });
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setEditingUser(null);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error updating user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchUsers();
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div className="user-management">
      <header className="header">
        <h2>User Management</h2>
      </header>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="username">{user.username}</td> {/* Apply CSS class here */}
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;