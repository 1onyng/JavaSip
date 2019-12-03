import { connect } from 'react-redux';
import { createReview } from '../../actions/reviews_actions';
import ReviewForm from './review_form';

const mSTP = (state, ownParams) => ({
  review: { rate: 5, comment: '' },
  formType: "Create Review",
  businessId: ownParams.match.params.businessId
});

const mDTP = dispatch => ({
  submitReview: (businessId, review) => dispatch(createReview(businessId, review))
});

export default connect(mSTP, mDTP)(ReviewForm);