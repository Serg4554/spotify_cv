import * as types from "./types";

export const setUuid = (uuid) => ({
  type: types.SET_UUID,
  payload: { uuid }
});

export const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: { token }
});
