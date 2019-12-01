import React from "react";
import { Link } from 'react-router-dom';

class BusinessShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBusiness(this.props.businessId);
  }

  render() {
    const { business, reviews, businessId, currentUser } = this.props;

    let reviewLink;
    let alreadySubmitted = false;

    //display review biutton if user is logged in
    reviews.forEach((review) => {
      if (review.author === currentUser) {
        alreadySubmitted = true;
      }
    })

    if (!alreadySubmitted && Boolean(currentUser)) {
      reviewLink = (
        <Link className="review-link" to={`/businesses/${businessId}/review`}>
          Write a Review</Link>
      );
    }

    if (!business) {
      return null;
    }
    const reviewsList = reviews.map(review => <h1>{review.comment}</h1>);

    const revs = reviews.length !== 0 ? reviewsList : null;
    return (
      <section>
        <h1>{business.business_name}</h1>
        {revs}
      </section>
    );
  }

}

export default BusinessShow;
