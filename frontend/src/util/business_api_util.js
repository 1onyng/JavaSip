import axios from 'axios';

export const fetchBusiness = id => {
  return axios.get(`/api/businesses/${id}`)
};

export const fetchBusiness = id => {
  return axios.get(`/api/businesses/${id}`)
};

export const fetchBusinesses = (search, bounds) => {
  return axios.get(`/api/businesses/`, {search, bounds})//check syntax
};



