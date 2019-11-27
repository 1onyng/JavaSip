import {RECEIVE_BUSINESS} from '../actions/business_actions';

const businessesReducer = (oldState = {}, action) => {
  
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_BUSINESS:
      return Object.assign({}, oldState, {[action.business._id]: action.business});
    default:
      return oldState;
  }
};

export default businessesReducer;