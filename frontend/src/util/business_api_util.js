import axios from 'axios';

export const fetchBusiness = id => {
  return axios.get(`/api/businesses/${id}`)
};
