import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAILURE,
  ADVERT_DETAIL_REQUEST,
  ADVERT_DETAIL_SUCCESS,
  ADVERT_DETAIL_FAILURE,
} from './types';

// import { login } from '../api/auth';
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

export const loginAction = (credentials, history) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: '/' } };
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

export const advertsLoadedRequest = () => {
  return {
    type: ADVERTS_LOADED_REQUEST,
  };
};
export const advertsLoadedSuccess = (adverts) => {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: {
      adverts,
    },
  };
};

export const advertsLoadedFailure = (error) => {
  return {
    type: ADVERTS_LOADED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertLoadAction = () => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };
};

export const advertCreatedRequest = () => {
  return {
    type: ADVERT_CREATED_REQUEST,
  };
};
export const advertCreatedSuccess = (advert) => {
  return {
    type: ADVERT_CREATED_SUCCESS,
    payload: {
      advert,
    },
  };
};

export const advertCreatedFailure = (error) => {
  return {
    type: ADVERT_CREATED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertCreatedAction = (advert) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertCreatedRequest());
    try {
      const advertCreated = await api.adverts.createAdvert(advert);
      dispatch(advertCreatedSuccess(advertCreated));
    } catch (error) {}
  };
};
