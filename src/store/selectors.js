export const getIsLogged = (state) => state.auth;
// export const getAdvertsList = (state) => state.adverts
export const getAdvertsList = (state) => state.adverts.data;
export const getAdvertCreated = (state) => state.adverts.data;
// export const getAdvertsLoaded = (state) => !!state.adverts.length
export const getAdvertsLoaded = (state) => !!state.adverts.loaded;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find((advert) => advert.id === advertId);

export const getAdvertsTags = (state) => state.advertsTags.tags;

export const getTagsLoaded = (state) => state.advertsTags.loaded;

export const getUi = (state) => state.ui;
