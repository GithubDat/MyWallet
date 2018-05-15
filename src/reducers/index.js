import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import messageReducer from './messageReducer';
import { LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({
  router: routerReducer,
  loginReducer,
  messageReducer,
});

const root = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default root;
