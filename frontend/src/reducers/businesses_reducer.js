import { RECEIVE_BUSINESS, RECEIVE_BUSINESSES } from '../actions/business_actions';

const businessesReducer = (oldState = {}, action) => {
  
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_BUSINESS:
      return Object.assign({}, oldState, { [action.payload.business._id]: action.payload.business });
    case RECEIVE_BUSINESSES:
      return action.businesses;
    default:
      return oldState;
  }
};

export default businessesReducer;