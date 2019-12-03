import axios from 'axios';
import $ from 'jquery';


// we might be able to pass just data
// we can test this later from front end and do the required changes in the backend
export const deleteReview = (reviewId, data) => {
  return axios.delete(`/api/reviews/${reviewId}/delete`, data)
};

export const updateReview = (reviewId, data) => {
  return axios.put(`/api/reviews/${reviewId}/update`, data)
};

export const createReview = (businessId, formData) => {
  const headers = { headers: { 
                      'content-type': 'multipart/form-data' ,
                      'accept': 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }};
  return axios.post(`/api/businesses/${businessId}/review`, formData, headers)
  
};