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

export const setText = (text) => ({
  type: types.SET_TEXT,
  payload: { text }
});

export const setPlaybackState = (playbackState) => ({
  type: types.SET_PLAYBACK_STATE,
  payload: { playbackState }
});