import React from 'react';
import NavBar from '../nav/navbar_container';
import { Link } from 'react-router-dom';

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page">
        <NavBar />
        <footer className="footer-main-page">
          <a href="https://github.com/1onyng">Tony</a>
          <a href="https://github.com/tmockler22">Tristan</a>
          <a href="https://github.com/RyanGonzalezUSA">Mohamed</a>
        </footer>
      </div>
    );
  }
}

export default MainPage;