import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessShowItem from "./business_show_item";
import SearchNav from "../nav/search_nav_container";
import Map from './business_map_show_container';
import RatingStar from "../rating/star_rating_container";

class BusinessShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchBusiness(this.props.businessId))
        .then(() => this.setState({loading: false}));
  }

  getReviewRate(reviews) {
    let sum = 0; 
    reviews.forEach(review => {
      sum += review.rate
    })
    let avg = Math.floor(sum / reviews.length);
    return reviews.length === 0 ? <p className="no-review-count">0 reviews</p> : <RatingStar name="rate" rate={avg} readOnly="true" />
  }

  render() {
    const { business, reviews, businessId, currentUser, users, removeReview } = this.props;
    if (this.state.loading) return null;

    let reviewLink;
    let alreadySubmitted = false;

    //display review button if user is logged in
    reviews.forEach((review) => {
      if (review.author === currentUser) {
        alreadySubmitted = true;
      }
    })

    if (!alreadySubmitted && Boolean(currentUser)) {
      reviewLink = (
        <Link className="review-link" to={`/createReview/${businessId}`}>
          <FontAwesomeIcon icon="star"/>Write a Review</Link>
      );
    }
    const reviewsList = reviews.map(review => {
      let user = Object.values(users).filter(user => user._id === review.author)[0];
      return (
        <BusinessShowItem
          key={review._id}
          review={review}
          user={user}
          currentUser={currentUser}
          removeReview={removeReview}
        />
      );
    });

    if (business) {
      //wait for photo functionality
      //////////////////////////////
      // const businessImg = business.photoUrls.map((photo, idx) => {
      //   return <img key={idx} src={photo} />;
      // }); 

      let address1 = business.street_address
      let address2 = (business.city.concat(", ", business.state));

      return (
        <>
          <div className="search-nav">
            <SearchNav />
          </div>
          <div className="business-header">
            <div className="bh-info-container">
              <div className="bh-info">
                <div className="bh-info-info">
                  <h1>{business.business_name}</h1>
                  <div className="bh-star-holder">
                    {this.getReviewRate(reviews)}
                    <p>{`${reviews.length} reviews`}</p>
                  </div>
                </div>
                <div className="bh-info-review">{reviewLink}</div>
              </div>
            </div>

            <div className="bh-images-container">
              <div className="bh-images">
                <div className="map-container">
                  <div className="businessMap">    
                    <Map business={business}/>
                  </div>
                  <div className="map-info">
                    <div className="map-info-address">
                      <p>
                        <FontAwesomeIcon icon="map-marker-alt" />
                        {address1}
                      </p>
                      <p>{address2}</p>
                    </div>
                    <div className="map-info-phone">
                      <p>
                        <FontAwesomeIcon icon="phone" />
                        {business.phone}
                      </p>
                    </div>
                    {/* <div className="map-info-website">
                      <p>
                        <FontAwesomeIcon icon="window-restore" />
                        insert business website
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="bh-images-list"><img src={business.imgURL}/></div>
              </div>
            </div>
          </div>

          <div className="business-reviews">
            <ul>{reviewsList}</ul>
          </div>
        </>
      );
    }
    else {
      return (
        <p>Loading...</p>
      );
    }
  }

}

export default BusinessShow;
