import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <button className="logout-button" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link to={'/login'} className="login-link">Log In</Link>
                <Link to={'/signup'} className="signup-link">Sign Up</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="nav-bar">
          <div className="nav-logo">
            <Link to={'/'} className="main-page-title"><img className="logo" src="stylesheets/images/javalogo.png" /></Link>
          </div>
          <div className="nav-links">
            { this.getLinks() }
          </div>
        </div>
      );
  }
}

export default NavBar;