import { authLoginRequest, advertsLoadedSuccess, loginAction } from './actions';
import {
  AUTH_LOGIN_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from './types';

describe('authLoginRequest', () => {
  test('should return an AUTH_LOGIN_REQUEST action', () => {
    const result = authLoginRequest();
    expect(result.type).toBe(AUTH_LOGIN_REQUEST);
  });
});

describe('advertsLoadedSuccess', () => {
  test('should return a ADVERTS_LOADED_SUCCESS action', () => {
    const adverts = 'adverts';
    const expectedAction = { type: ADVERTS_LOADED_SUCCESS, payload: adverts };
    const result = advertsLoadedSuccess(adverts);
    expect(result).toEqual(expectedAction);
  });
});

// -------->TEST FUNCIÓN ASÍNCRONA<---------------------------

describe('loginAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const action = loginAction(credentials);
    const dispatch = jest.fn();
    const getState = () => {};
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
    };
    const history = {
      location: {},
      replace: jest.fn(),
    };
    test('should dispatch an AUTH_LOGIN_REQUEST acction', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });

    test('should call api.auth.login', () => {
      action(dispatch, getState, { api, history });
      expect(api.auth.login).toHaveBeenLastCalledWith(credentials);
    });

    test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
      await action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
    });

    test('should redirect to /', async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
    });
  });

  describe('when login api throws', () => {
    const credentials = 'credentials';
    const action = loginAction(credentials);
    const dispatch = jest.fn();
    const error = 'unauthorized';
    const getState = () => {};

    test('should dispatch AUTH_LOGIN_FAILURE action', async () => {
      const api = {
        auth: { login: jest.fn().mockRejectedValue(error) },
      };
      await action(dispatch, getState, { api });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: AUTH_LOGIN_FAILURE,
        payload: error,
        error: true,
      });
    });
  });
});
