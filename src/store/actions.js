import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERTS_CREATED,
} from './types';

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
