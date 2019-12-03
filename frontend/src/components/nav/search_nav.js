import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';
class SearchNav extends React.Component {
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
        <div className="logout-search-div">
          <button className="search-logout-button" onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/login'} className="search-login-link">Log In</Link>
          <Link to={'/signup'} className="search-signup-link">Sign Up</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="search-nav-bar">
        <div className="nav-logo">
            <Link to={'/'} className="search-page-title"><img className="search-nav-logo" src="/stylesheets/images/javasiplogo.png" /></Link>
       </div>
        <div className="nav-bar-search">
          <SearchBar />
        </div>
        <div className="nav-search-links">
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default SearchNav;