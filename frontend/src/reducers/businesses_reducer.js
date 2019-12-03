import { RECEIVE_BUSINESS, RECEIVE_BUSINESSES } from '../actions/business_actions';

const businessesReducer = (oldState = {}, action) => {
  
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_BUSINESS:
      return Object.assign({}, oldState, { [action.payload.business._id]: action.payload.business });
    case RECEIVE_BUSINESSES: 
    
      let businesses = action.businesses.data.businesses;
      let imageURLs = action.businesses.data.imgUrls;
      for (let i = 0; i < businesses.length; i++) {
        let img = imageURLs.filter(item => item.includes(businesses[i]._id))[0];
        businesses[i].imgURL = img ? img : "";
      }
      return businesses;
    default:
      return oldState;
  }
};

export default businessesReducer;