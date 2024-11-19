import React, { Component } from 'react';

// Creating UserContext to share the user data globally
export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
    };
  }

  // Fetch users from JSONPlaceholder API
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      this.setState({ users: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // Add a new user to the list (simulation)
  addUser = async (newUser) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const addedUser = await response.json();
      this.setState((prevState) => ({
        users: [...prevState.users, addedUser],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  // Delete a user by ID
  deleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { users, loading, error } = this.state;
    return (
      <UserContext.Provider value={{
        users,
        loading,
        error,
        addUser: this.addUser,
        deleteUser: this.deleteUser,
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
