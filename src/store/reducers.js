import { combineReducers } from 'redux';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERTS_CREATED,
} from './types';

const initialState = {
  auth: false,
  adverts: [],
  ui: {},
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED:
      return action.payload.adverts;
    case ADVERTS_CREATED:
      return [...state.adverts, action.payload.advert];
    default:
      return state;
  }
}

export function ui(state = initialState, action) {
  return state;
}
