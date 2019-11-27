import { RECEIVE_Review , REMOVE_REVIEW} from '../actions/reviews_actions';

const ReviewsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_Review:
      return Object.assign({}, state, {[action.payload.review.id]: action.payload.review});
    case REMOVE_REVIEW:
      newState = Object.assign({}, state);
      delete newState[action.payload.reviewId];
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;