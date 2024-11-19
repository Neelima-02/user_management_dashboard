
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import NotFound from './pages/NotFound';
import './styles.css';  // Importing global styles

class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <Switch>
            <Route path="/" exact component={UserList} />
            <Route path="/add" component={AddUser} />
            <Route path="/edit/:id" component={EditUser} />
            <Route component={NotFound} />
          </Switch>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
