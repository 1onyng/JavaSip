import { RECEIVE_ALL_USERS } from '../actions/session_actions'

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      let users = Object.values(action.users.data.usersObj);
      let avatars = action.users.data.avatars;
      
      for (let i = 0; i < users.length; i++) {
        let img = avatars.filter(avatar => avatar.includes(users[i]._id))[0];
        users[i].imgURL = img ? img : "";
      }

      return users;
    default:
      return state;
  }
};

export default usersReducer;