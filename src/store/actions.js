import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERTS_CREATED,
} from './types';

export const authLogin = () => {
  return {
    type: AUTH_LOGIN,
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
