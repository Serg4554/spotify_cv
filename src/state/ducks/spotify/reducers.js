import * as types from './types';

/** State shape
 * {
 *  loading: bool,
 *  error: string,
 *  ready: bool,
 *  text: string,
 *  playbackState: object,
 *  mute: bool
 * }
 */

const initState = {
  loading: false,
  error: '',
  ready: false,
  text: '',
  playbackState: {},
  mute: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case types.SET_READY:
      return {
        ...state,
        ready: action.payload.ready,
      };

    case types.SET_TEXT:
      return {
        ...state,
        text: action.payload.text,
      };

    case types.SET_PLAYBACK_STATE:
      return {
        ...state,
        playbackState: action.payload.playbackState,
      };

    case types.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute,
      };

    default:
      return state;
  }
};

export default reducer;
