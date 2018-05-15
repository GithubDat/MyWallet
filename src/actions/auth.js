import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  MESSAGE_CREATE,
} from './actionTypes';
import User from './service';
import { createBrowserHistory } from 'history';

const DEFAULT_ERROR_MESSAGE = 'Oops something went wrong!';
const DEFAULT_SUCCESS_MESSAGE = 'Success';

export function login({ email, password }, history) {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const response = await User.login(email, password);
      const { access_token } = response;
      const user = { email };
      sessionStorage.setItem('jwt', access_token);
      dispatch(loginSuccess(user));
      dispatch(getMe());
      history.push('/home');
    } catch (error) {
      dispatch(loginFailure());
      dispatch(createErrorMessage(error.messages));
    }
  };
}

export function getMe() {
  return async dispatch => {
    const response = await User.getMe();
    const { firstName, lastName, email, lastAuditTime, photoUrl } = response;
    const user = { firstName, lastName, email, photoUrl };
    if (response.error || response.errorMessage) {
      console.log('Token exists, but login failed!');
      return;
    }
    dispatch(loginSuccess(user));
  };
}

export function loginSuccess(user, storeUserBool) {
  return { type: LOGIN_SUCCESS, user };
}
export function loginRequest() {
  return { type: LOGIN_REQUEST };
}
export function loginFailure() {
  return { type: LOGIN_FAILURE };
}

export function logout() {
  return { type: LOGOUT };
}

export function createErrorMessage(list = [DEFAULT_ERROR_MESSAGE]) {
  const message = { list, messageType: 'error' };
  return { type: MESSAGE_CREATE, message };
}

export function createSuccessMessage(list = [DEFAULT_SUCCESS_MESSAGE]) {
  const message = { list, messageType: 'success' };
  return { type: MESSAGE_CREATE, message };
}
