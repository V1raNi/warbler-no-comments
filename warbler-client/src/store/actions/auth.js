import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

// when we log in we place a token in localStorage, so logging out is going to be the idea of removing that token
export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

// function that we're going to run to log in or sign up successfully
export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem('jwtToken', token);
          // pass a token which is saved for future requests
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError);
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  }
}