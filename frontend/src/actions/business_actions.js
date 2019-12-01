import * as BusinessApiUtil from "../util/business_api_util";

export const RECEIVE_BUSINESS = "RECEIVE_BUSINESS";
export const RECEIVE_BUSINESSES = "RECEIVE_BUSINESSES";
export const RECEIVE_BUSINESS_REVIEWS = "RECEIVE_BUSINESS_REVIEWS";


const receiveBusiness = (payload) => {
  return {
    type: RECEIVE_BUSINESS,
    payload
  };
};

export const receiveBusinesses = (businesses) => {
  return ({
    type: RECEIVE_BUSINESSES,
    businesses,
  })
};

export const fetchBusiness = id => dispatch => {
  return BusinessApiUtil.fetchBusiness(id)
    .then(payload => {dispatch(receiveBusiness(payload.data))})
};


export const fetchBusinesses = (search, bounds) => (dispatch) => {
  return BusinessApiUtil.fetchBusinesses(search, bounds)
    .then((businesses) => {dispatch(receiveBusinesses(businesses))})
};
