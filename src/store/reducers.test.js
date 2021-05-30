import { adverts, initialState, tags } from './reducers';
import { ADVERTS_LOADED_SUCCESS, ADVERT_DELETED_SUCCESS } from './types';

describe('adverts', () => {
  test('should manage ANY action', () => {
    const state = initialState;

    const action = { type: 'ANY' };
    const nextState = tags(state, action);

    expect(nextState).toBe(state);
  });

  test('should manager ADVERTS_LOADED_SUCCESS action', () => {
    const state = initialState.adverts;
    const action = { type: ADVERTS_LOADED_SUCCESS, payload: [] };
    const expectedState = {
      ...initialState.adverts,
      loaded: true,
      data: action.payload,
    };
    const nextState = adverts(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });

  test('should manager ADVERT_DELETED_SUCCESS action', () => {
    const state = initialState.adverts;
    const advert = {};
    const action = { type: ADVERT_DELETED_SUCCESS, payload: advert };
    const expectedState = {
      ...initialState.adverts,
      loaded: false,
      data: [...initialState.adverts.data, action.payload],
    };
    const nextState = adverts(state, action);
    expect(nextState).toStrictEqual(expectedState);
  });
});
