import { RECEIVE_BUSINESSES, RECEIVE_USER_BUSINESSES, RECEIVE_NEW_BUSINESS } from '../actions/business_actions';

const BusinessesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_BUSINESSES:
      newState.all = action.businesses.data;
      return newState;
    case RECEIVE_USER_BUSINESSES:
      newState.user = action.businesses.data;
      return newState;
    case RECEIVE_NEW_BUSINESS:
      newState.new = action.business.data
      return newState;
    default:
      return state;
  }
};

export default BusinessesReducer;