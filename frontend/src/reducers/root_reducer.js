import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import businesses from './businesses_reducer';

const RootReducer = combineReducers({
  session: session, 
  errors: errors, 
  businesses: businesses
});

export default RootReducer;