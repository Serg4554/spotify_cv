import * as types from "./types";

export const setLoading = (loading) => ({
  type: types.SET_LOADING,
  payload: { loading }
});

export const setError = (error) => ({
  type: types.SET_ERROR,
  payload: { error }
});

export const setReady = (ready) => ({
  type: types.SET_READY,
  payload: { ready }
});