import React from 'react';
import NavBar from '../nav/navbar_container';
import { Link } from 'react-router-dom';
import SearchBar from '../nav/searchbar';
import RatingStar from "../rating/star_rating_container";

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

  getPrice(n) {
    let price = "";
    let i;  
    for (i = 0; i < n; i++) {
      price += "$";
    }
    return <p>{price}</p>
  }

  getReviewRate(reviews) {
    let sum = 0;
    reviews.forEach(review => {
      sum += review.rate
    })
    let avg = Math.floor(sum / reviews.length);
    return reviews.length === 0 ? <p className="no-review-count-main">0 reviews</p> : <div className="avg-rate-main"><RatingStar name="rate" rate={avg} readOnly="true" /><p className="has-review-count-main">{reviews.length} reviews</p></div>;
  }

  getBusinesses() { 
    const businessList = this.props.businesses.map((business, i) => {
    return <div className="main-business" key={i}><img className="main-page-shop-img" src={business.imgURL}/>
    <Link to={`/businesses/${business._id}`} className="main-business-name">{business.business_name}</Link>
    {this.getReviewRate(business.reviews)}
    </div>
    });
    const newBusinesses = businessList.slice(0, 3);
    return newBusinesses; 
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