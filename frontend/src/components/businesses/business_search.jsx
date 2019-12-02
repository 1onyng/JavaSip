import React from "react";

class BusinessSearch extends React.Component {

  componentDidMount() {
    this.props.fetchBusinesses(this.props.businessId);
  }

  render() {

    return (
      <section>
      </section>
    );
  }

}

export default BusinessSearch;
