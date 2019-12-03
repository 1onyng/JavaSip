import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessShowItem from "./business_show_item";

class BusinessShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBusiness(this.props.businessId);
    this.props.fetchUsers();
  }

  render() {
    const { business, reviews, businessId, currentUser, users, removeReview } = this.props;

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
        <Link className="review-link" to={`/businesses/${businessId}/review`}>
          <FontAwesomeIcon icon="star" />Write a Review</Link>
      );
    }
    /////////////////////////////

    // if (!business) {
    //   return null;
    // }

    // const reviewsList = reviews.map(review => <h1>{review.comment}</h1>);

    // const revs = reviews.length !== 0 ? reviewsList : null;
    // return (
    //   <section>
    //     <h1>{business.business_name}</h1>
    //     {revs}
    //   </section>
    // );

    const reviewsList = reviews.map(review => {
      return (
        <BusinessShowItem
          key={review._id}
          review={review}
          user={users[review.author]}
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
          <div className="business-header">
            <div className="bh-info-container">
              <div className="bh-info">
                <div className="bh-info-info">
                  <h1>{business.business_name}</h1>
                  <div className="bh-star-holder">
                    <div
                      // insert business rating
                    ></div>
                    {/* <p>{`${business.reviews.length} reviews`}</p> */}
                  </div>

                </div>
                <div className="bh-info-review">{reviewLink}</div>
              </div>
            </div>

            <div className="bh-images-container">
              <div className="bh-images">
                <div className="map-container">
                  <div className="businessMap">
                    {/* insert map component */}
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
                {/* <div className="bh-images-list">{businessImg}</div> */}
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
