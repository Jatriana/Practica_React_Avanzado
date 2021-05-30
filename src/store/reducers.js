import { combineReducers } from 'redux';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  UI_RESET_ERROR,
  AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DETAIL_REQUEST,
  ADVERT_DETAIL_SUCCESS,
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
} from './types';

const initialState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },

  tags: { loaded: false, data: [] },

  ui: { Loading: false, error: null },
};

export function auth(state = initialState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = initialState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...state, loaded: true, data: action.payload };
    case ADVERT_CREATED_SUCCESS:
    case ADVERT_DETAIL_SUCCESS:
    case ADVERT_DELETED_SUCCESS:
      return { ...state, loaded: false, data: [...state.data, action.payload] };

    default:
      return state;
  }
}

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case ADVERTS_TAGS_REQUEST:
      return { loaded: true, data: action.payload };

    default:
      return state;
  }
}

export function ui(state = initialState, action) {
  if (action.error) {
    return { ...state, loading: false, error: action.payload };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case ADVERTS_LOADED_REQUEST:
    case ADVERTS_TAGS_REQUEST:
    case ADVERT_CREATED_REQUEST:
    case ADVERT_DETAIL_REQUEST:
    case ADVERT_DELETED_REQUEST:
      return { ...state, loading: true, error: null };

    case AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
    case ADVERTS_TAGS_SUCCESS:
    case ADVERT_CREATED_SUCCESS:
    case ADVERT_DETAIL_SUCCESS:
    case ADVERT_DELETED_SUCCESS:
      return { ...state, loading: false };

    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
