import { connect } from "react-redux";
import showMap from "./business_map_show";
import { fetchBusinesses } from "../../actions/business_actions";

const mapStateToProps = (state, ownProps) => {
  const business = ownProps.business;
  return {
    business,
    center: {
      lat: business.lat,
      lng: business.long
    },
    zoom: 11
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBusinesses: search => dispatch(fetchBusinesses(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(showMap);
