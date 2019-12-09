import { RECEIVE_REVIEW , REMOVE_REVIEW} from '../actions/reviews_actions';
import { RECEIVE_BUSINESS } from "../actions/business_actions";

const ReviewsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BUSINESS:
      return action.payload.reviews;
    case RECEIVE_REVIEW:
      return Object.assign({}, state, {[action.review.data.review._id]: action.review.data.review});
    case REMOVE_REVIEW:
      newState = Object.assign({}, state);
      delete newState[action.reviewId.data.reviewId];
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;
