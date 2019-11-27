import { getBusinesses, getUserBusinesses, writeBusiness } from '../util/business_api_util';

export const RECEIVE_BUSINESSES = "RECEIVE_BUSINESSES";
export const RECEIVE_USER_BUSINESSES = "RECEIVE_USER_BUSINESSES";
export const RECEIVE_NEW_BUSINESS = "RECEIVE_NEW_BUSINESS";

export const receiveBusinesses = businesses => ({
  type: RECEIVE_BUSINESSES,
  businesses
});

export const receiveUserBusinesses = businesses => ({
  type: RECEIVE_USER_BUSINESSES,
  businesses
});

export const receiveNewBusiness = business => ({
  type: RECEIVE_NEW_BUSINESS,
  business
})

export const fetchBusinesses = () => dispatch => (
  getBusinesses()
    .then(businesses => dispatch(receiveBusinesses(businesses)))
    .catch(err => console.log(err))
);

export const fetchUserBusinesses = id => dispatch => (
  getUserBusinesses(id)
    .then(businesses => dispatch(receiveUserBusinesses(businesses)))
    .catch(err => console.log(err))
);

export const composeBusiness = data => dispatch => (
  writeBusiness(data)
    .then(business => dispatch(receiveNewBusiness(business)))
    .catch(err => console.log(err))
);