import { MESSAGE_CREATE } from '../actions/actionTypes';

const initialState = {
  message: null,
};

function message(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_CREATE:
      return { ...state, message: action.message };
    default:
      return state;
  }
}

export default message;
