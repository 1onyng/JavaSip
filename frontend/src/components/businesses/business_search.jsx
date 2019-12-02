import React from "react";
import { Link } from 'react-router-dom';
import SearchNav from '../nav/search_nav_container';
class BusinessSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
    this.props.fetchBusinesses(this.props.search);
  }

  getBusinesses() {
     
    const businessList = this.props.businesses.map((business, i) => <li key={i}>{business.business_name}</li>);
    return businessList;
  }

  render() {

    return (
      <div>
        <div className="search-nav">
          <SearchNav />
        </div>
        
        <p>Browsing {this.props.search} Coffee Shops</p>
        {this.getBusinesses()}
      </div>
    );
  }

}

export default BusinessSearch;
