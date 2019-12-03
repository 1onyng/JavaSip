import { RECEIVE_BUSINESS, RECEIVE_BUSINESSES } from '../actions/business_actions';

const businessesReducer = (oldState = {}, action) => {
  
  Object.freeze(oldState);
  let imageURLs;
  switch (action.type) {
    case RECEIVE_BUSINESS:
      imageURLs = action.payload.imgUrls;
      let business = action.payload.business;
      let img = imageURLs.filter(item => item.includes(business._id))[0];
      business.imgURL = img;
      return Object.assign({}, oldState, { [business._id]: business });
    case RECEIVE_BUSINESSES: 
    
      let businesses = action.businesses.data.businesses;
      imageURLs = action.businesses.data.imgUrls;
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