export const getIsLogged = (state) => state.auth;

export const getAdvertsList = (state) => state.adverts;
export const getAdvertCreated = (state) => state.advertCreated;

export const getAdvertsLoaded = (state) => !!state.adverts.length;

export const getUi = (state) => state.ui;
