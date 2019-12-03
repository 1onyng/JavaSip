import { connect } from 'react-redux';
// TODO to be updated from tony work
// import { createReview } from '../../actions/business_actions';
import ReviewForm from './review_form';

const mSTP = () => ({
  review: { rate: 5, comment: '' },
  formType: "Create Review"
});

const mDTP = dispatch => ({
  // submitEvent: event => dispatch(createEvent(event))
});

export default connect(mSTP, mDTP)(ReviewForm);