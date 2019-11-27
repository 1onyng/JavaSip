import * as BusinessApiUtil from "../util/business_api_util";

export const RECEIVE_BUSINESS = "RECEIVE_BUSINESS";
export const RECEIVE_BUSINESS_REVIEWS = "RECEIVE_BUSINESS_REVIEWS";

const receiveBusiness = ({ business }) => {
  return {
    type: RECEIVE_BUSINESS,
    business: business,
    // reviews: business.reviews
  };
};

export const fetchBusiness = id => dispatch => {
  return BusinessApiUtil.fetchBusiness(id)
    .then(payload => dispatch(receiveBusiness(payload.data)));
};