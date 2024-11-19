import React, { Component } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import './AddUser.css';  // Importing styling for AddUser component

class AddUser extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, department } = this.state;
    const newUser = { name: `${firstName} ${lastName}`, email, department };

    this.context.addUser(newUser);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="add-user-form">
        <h2>Add User</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
