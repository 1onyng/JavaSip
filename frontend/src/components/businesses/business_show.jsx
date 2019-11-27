import React from "react";

class BusinessShow extends React.Component {

  componentDidMount() {
    this.props.fetchBusiness(this.props.businessId);
  }

  render() {
    const { business } = this.props;

    if (!business) {
      return null;
    }

    return (
      <section>
        <h1>{business.business_name}</h1>
      </section>
    );
  }

}

export default BusinessShow;
