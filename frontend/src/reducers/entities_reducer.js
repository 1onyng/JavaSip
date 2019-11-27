import { combineReducers } from "redux";
import businessesReducer from "./businesses_reducer";
// import reviewsReducer from './reviews_reducer';

const entitiesReducer = combineReducers({
  businesses: businessesReducer,
  // reviews: reviewsReducer
});

export default entitiesReducer;
