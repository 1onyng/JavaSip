import { RECEIVE_ALL_USERS } from '../actions/session_actions'

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.users.data;
    default:
      return state;
  }
};

export default usersReducer;