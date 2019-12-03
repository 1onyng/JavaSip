import { combineReducers } from "redux";
import businessesReducer from "./businesses_reducer";
import reviewsReducer from './reviews_reducer';
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
  businesses: businessesReducer,
  reviews: reviewsReducer,
  users: usersReducer
});

export default entitiesReducer;
