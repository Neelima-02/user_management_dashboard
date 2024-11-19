import React, { Component } from 'react';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import './EditUser.css';  // Importing styling for EditUser component

class EditUser extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.state = {
      id,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      redirect: false,
    };
  }

  async componentDidMount() {
    const { users } = this.context;
    const user = users.find((user) => user.id === parseInt(this.state.id));
    if (user) {
      this.setState({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        email: user.email,
        department: user.department,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, department } = this.state;
    const updatedUser = { name: `${firstName} ${lastName}`, email, department };

    this.context.updateUser(updatedUser);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="edit-user-form">
        <h2>Edit User</h2>
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
          <button type="submit">Update User</button>
        </form>
      </div>
    );
  }
}

export default EditUser;
