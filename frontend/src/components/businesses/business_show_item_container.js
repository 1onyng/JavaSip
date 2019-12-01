import { removeReview } from '../../actions/reviews_actions'
import BusinessShowItem from "./business_show_item";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return ({
    currentUser: state.session.currentUser,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    removeReview: (reviewId) => dispatch(removeReview(reviewId)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessShowItem);