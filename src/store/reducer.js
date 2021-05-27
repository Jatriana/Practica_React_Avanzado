import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  ADVERTS_CREATED,
} from './types';
const initialState = {
  auth: false,
  //advert:[],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, auth: true };
    case AUTH_LOGOUT:
      return { ...state, auth: false };
    case ADVERTS_LOADED:
      return { ...state, adverts: action.payload.adverts };
    case ADVERTS_CREATED:
      return { ...state, adverts: [...state.adverts, action.payload.advert] };
    default:
      return state;
  }
}
export default reducer;
