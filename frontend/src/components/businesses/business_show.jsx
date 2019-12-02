import React from "react";

class BusinessShow extends React.Component {

  componentDidMount() {
    this.props.fetchBusiness(this.props.businessId);
  }

  render() {
    const { business, reviews } = this.props;

    if (!business) {
      return null;
    }
    const reviewsList = reviews.map(review => <h1>{review.comment}</h1>);
    const display = reviews.length !== 0 ? reviewsList : null;
    return (
      <section>
        <h1>{business.business_name}</h1>
        {display}
        {/* <h1>{reviews[0].comment}</h1> */}
      </section>
    );
  }

}

export default BusinessShow;
