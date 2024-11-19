import React, { Component } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import './UserList.css';  // Importing styling for UserList component

class UserList extends Component {
  static contextType = UserContext;

  render() {
    const { users, loading, error, deleteUser } = this.context;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="user-list">
        <h2>User List</h2>
        <Link to="/add">Add User</Link>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              <Link to={`/edit/${user.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
