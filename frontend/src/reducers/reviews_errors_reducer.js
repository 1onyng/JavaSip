import { RECEIVE_REVIEWS_ERRORS} from '../actions/reviews_actions';

const ReviewsErrorsReducer = (state , action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEWS_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default ReviewsErrorsReducer;