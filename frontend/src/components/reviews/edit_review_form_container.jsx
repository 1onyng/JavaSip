import React from 'react';
import { connect } from 'react-redux';
import { updateReview} from '../../actions/reviews_actions';

// TODO from tony // get the review
import { requestEvent} from '../../actions/business_actions';
import ReviewForm from './review_form';

class EditReviewForm extends React.Component {

  componentDidMount(){
    this.props.requestEvent(this.props.match.params.eventId);
  }
  render () {
    const { event, formType, submitEvent } = this.props;
    if (!event) return null;
    return (
      <ReviewForm
        event={event}
        formType={formType}
        submitEvent={submitEvent} />
    );
  }
}

const mSTP = (state, ownProps) => ({
  review: state.reviews[ownProps.match.params.eventId],
  formType: 'Update Review'
});

const mDTP = (dispatch) => ({
  requestReview: reviewId => dispatch(requestReview(reviewId)),
  submitEvent : review => dispatch(updateReview(review))
});

export default connect(mSTP, mDTP)(EditReviewForm);