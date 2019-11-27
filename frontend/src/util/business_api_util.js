import axios from 'axios';

export const getBusinesses = () => {
  return axios.get('/api/businesses')
};

export const getUserBusinesses = id => {
  return axios.get(`/api/businesses/user/${id}`)
};

export const writeBusiness = data => {
  return axios.post('/api/businesses/', data)
};

export const reviewBusiness = (businessId, comment, rate) => {
  return axios.post('/api/businesses/id/review', {businessId: businessId, comment: comment, rate: rate})
};