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

  componentDidMount() {
    this.props.fetchBusinesses("Oakland");
  }

  getBusinesses() {
    const businessList = this.props.businesses.map((business, i) => <div className="main-business" key={i}><img src={business.imgURL}/><Link to={`/businesses/${business._id}`} className="main-business-name">{business.business_name}</Link></div>);
    return businessList;
  }

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
        <SearchBar />
        <footer className="footer-main-page">
          <a href="https://github.com/1onyng">Tony</a>
          <a href="https://github.com/tmockler22">Tristan</a>
          <a href="https://github.com/RyanGonzalezUSA">Mohamed</a>
        </footer>
      </div>
        <div className="business-index">
          <p className="index-title-main">JavaSip Oakland</p>
          <p className="index-description-main">Hot & New Coffee Shops</p>
          <div className="main-page-business-list">
            {this.getBusinesses()}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;