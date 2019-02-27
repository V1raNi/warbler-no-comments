import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
}

// log out will be the same - we just pass an empty object, that way we don't need another entire action type
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // if the user is authenticated, there would be more than one key inside which means length is going to be > 0 (we can use length > 0)
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
}