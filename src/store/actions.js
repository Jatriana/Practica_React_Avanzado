import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERTS_CREATED,
} from './types';

import { login } from '../api/auth';
export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};
export const authLoginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
};
export const authLoginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
};

export const loginAction = (credentials, history, location) => {
  return async function (dispatch, getState) {
    dispatch(authLoginRequest());
    try {
      await login(credentials);
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(authLoginSuccess());
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const resetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};
export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const advertsLoaded = (adverts) => {
  return {
    type: ADVERTS_LOADED,
    payload: {
      adverts,
    },
  };
};

export const advertsCreated = (advert) => {
  return {
    type: ADVERTS_CREATED,
    payload: {
      advert,
    },
  };
};
