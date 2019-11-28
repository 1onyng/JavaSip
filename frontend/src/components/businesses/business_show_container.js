import { fetchBusiness } from "../../actions/business_actions";
import BusinessShow from "./business_show";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const businessId = (ownProps.match.params.businessId);
  const business = state.entities.businesses[businessId]; 
  const reviews = Object.keys(state.entities.reviews).map(id => state.entities.reviews[id])

  return {
    business,
    businessId,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBusiness: id => dispatch(fetchBusiness(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessShow);
