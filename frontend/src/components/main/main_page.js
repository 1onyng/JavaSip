import React from 'react';
import NavBar from '../nav/navbar_container';
import { Link } from 'react-router-dom';
import SearchBar from '../nav/searchbar';
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let location = this.state.location; 
    
  // }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
      <div>
      <div className="main-page">
        <NavBar />
        {/* <div className="search-bar">
          <p className="search-bar-how">Coffee Shops Near</p>
          <input type="text" className="search-input" 
                             value={this.state.location}
                             onChange={this.update('location')}
                             placeholder="Oakland"/>
                             
            <Link to={`/search/${this.state.location}`}><button className="search-bar-submit"><i className="fas fa-search"></i></button></Link>
        </div> */}
        <SearchBar />
        <footer className="footer-main-page">
          <a href="https://github.com/1onyng">Tony</a>
          <a href="https://github.com/tmockler22">Tristan</a>
          <a href="https://github.com/RyanGonzalezUSA">Mohamed</a>
        </footer>
      </div>
        <div className="business-index">
          <p className="index-title-main">JavaSip Oakland</p>
          </div>
      </div>
    );
  }
}

export default MainPage;