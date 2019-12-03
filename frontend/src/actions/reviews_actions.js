import * as ReviewsUtil from '../util/reviews_api_util';
import { fetchBusiness } from "./business_actions";

export const RECEIVE_ALL_Reviews = "RECEIVE_ALL_Reviews";
export const RECEIVE_Review = "RECEIVE_Review";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const RECEIVE_REVIEWS_ERRORS = "RECEIVE_REVIEWS_ERRORS";

export const receiveAllReviews = reviews => ({
  type: RECEIVE_ALL_Reviews,
  reviews
});

export const receiveReview = review => ({
  type: RECEIVE_Review,
  review
});

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const receiveErrors = errors => ({
  type: RECEIVE_REVIEWS_ERRORS,
  errors
});

export const updateReview = (reviewId, data) => dispatch => (
  ReviewsUtil.updateReview(reviewId, data)
    .then(review => dispatch(receiveReview(review)),
    err => dispatch(receiveErrors(err.response.data)))
);

export const deleteReview = (reviewId) => dispatch => (
  ReviewsUtil.deleteReview(reviewId)
    .then(reviewId => dispatch(removeReview(reviewId)),
    err => dispatch(receiveErrors(err.response.data)))
);

// export const deleteReview = (reviewId, businessId) => dispatch => {
//   return ReviewsUtil.deleteReview(reviewId).then(() => {
//     return dispatch(fetchBusiness(businessId));
//   });
// };