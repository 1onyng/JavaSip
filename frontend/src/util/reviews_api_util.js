import axios from 'axios';

// we might be able to pass just data
// we can test this later from front end and do the required changes in the backend
export const deleteReview = (reviewId, data) => {
  return axios.delete(`/api/reviews/${reviewId}/delete`, data)
};

export const updateReview = (reviewId, data) => {
  return axios.put(`/api/reviews/${reviewId}/update`, data)
};
