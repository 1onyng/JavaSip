import { fetchBusiness } from "../../actions/business_actions";
import { fetchUsers } from "../../actions/session_actions";
import { deleteReview } from "../../actions/reviews_actions";
import BusinessShow from "./business_show";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const businessId = (ownProps.match.params.businessId);
  const business = state.entities.businesses[businessId]; 
  const currentUser = state.session.user;
  const reviews = Object.keys(state.entities.reviews).reverse().map(id => state.entities.reviews[id]);
  const users = state.entities.users;

  return {
    currentUser,
    business,
    businessId,
    reviews,
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBusiness: id => dispatch(fetchBusiness(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    removeReview: reviewId => dispatch(deleteReview(reviewId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessShow);
