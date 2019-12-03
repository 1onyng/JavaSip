import axios from 'axios';

export const fetchBusiness = id => {
  return axios.get(`/api/businesses/${id}`)
};

export const fetchBusinesses = (search) => { 
  return axios.get(`/api/businesses/search/${search}`)
  
};