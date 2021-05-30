import { getAdvertDetail, getAdvertsLoaded, getTagsLoaded } from './selectors';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_TAGS_REQUEST,
  ADVERTS_TAGS_SUCCESS,
  ADVERTS_TAGS_FAILURE,
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
    payload: adverts,
  };
};

export const advertsLoadedFailure = (error) => {
  return {
    type: ADVERTS_LOADED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsLoadAction = () => {
  return async function (dispatch, getState, { api }) {
    const advertsLoaded = getAdvertsLoaded(getState());
    if (advertsLoaded) {
      return;
    }
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
    payload: advert,
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
      const advertCreatedId = await api.adverts.createAdvert(advert);
      dispatch(advertCreatedSuccess(advertCreatedId));
      history.push(`/adverts/${advertCreatedId.id}`);
    } catch (error) {
      dispatch(advertCreatedFailure(error));
    }
  };
};
export const advertsDetailRequest = () => {
  return {
    type: ADVERT_DETAIL_REQUEST,
  };
};

export const advertsDetailSuccess = (id) => {
  return {
    type: ADVERT_DETAIL_SUCCESS,
    payload: id,
  };
};

export const advertsDetailFailure = (error) => {
  return {
    type: ADVERT_DETAIL_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsDetailAction = (advertId) => {
  return async function (dispatch, getState, { api, history }) {
    const advertLoaded = getAdvertDetail(getState(), advertId);
    if (advertLoaded) {
      return;
    }
    dispatch(advertsDetailRequest());
    try {
      const advertDetail = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailSuccess(advertDetail));
      return advertDetail;
    } catch (error) {
      dispatch(advertsDetailFailure(error));
    }
  };
};

export const advertDeletedRequest = () => {
  return {
    type: ADVERT_DELETED_REQUEST,
  };
};

export const advertDeletedSuccess = (id) => {
  return {
    type: ADVERT_DELETED_SUCCESS,
    payload: id,
  };
};

export const advertDeletedFailure = (error) => {
  return {
    type: ADVERT_DELETED_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertDeletedAction = (id) => {
  return async function (dispatch, getState, { api, history }) {
    dispatch(advertDeletedRequest());
    try {
      const deletedAdvert = await api.adverts.deleteAdvert(id);
      dispatch(advertDeletedSuccess(deletedAdvert));
      history.push('/');
    } catch (error) {
      dispatch(advertDeletedFailure(error));
    }
  };
};

export const advertsTagsRequest = () => {
  return {
    type: ADVERTS_TAGS_REQUEST,
  };
};
export const advertsTagsSuccess = (tags) => {
  return {
    type: ADVERTS_TAGS_SUCCESS,
    payload: tags,
  };
};
export const advertsTagsFailure = (error) => {
  return {
    type: ADVERTS_TAGS_FAILURE,
    payload: error,
    error: true,
  };
};

export const advertsTagsAction = () => {
  return async function (dispatch, getState, { api }) {
    // const tagstLoaded = getTagsLoaded(getState());
    // if (tagstLoaded) {
    //   return;
    // }
    dispatch(advertsTagsRequest());
    try {
      const tags = await api.adverts.getTags();
      dispatch(advertsTagsSuccess(tags));
    } catch (error) {
      dispatch(advertsTagsFailure(error));
    }
  };
};
