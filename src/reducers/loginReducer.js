import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userDetails: {},
  requesting: false,
};

function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userDetails: action.user,
        isAuthenticated: true,
        requesting: false,
      };
    case LOGIN_REQUEST:
      return { ...state, requesting: true };
    case LOGIN_FAILURE:
      return { ...initialState, isAuthenticated: false, requesting: false };
    default:
      return state;
  }
}
export default user;
