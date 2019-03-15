import * as actions from './actions';
import * as sessionOperations from '../session/operations';
import SpotifyService from '../../SpotifyService';

const load = () => dispatch => {
  SpotifyService.pause();
  SpotifyService.load()
    .then(ready => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setReady(ready));
      dispatch(actions.setError(''));
      SpotifyService.onStateChanged((playbackState) => {
        dispatch(actions.setPlaybackState(playbackState));
      });
    })
    .catch(error => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setReady(false));
      dispatch(actions.setError(error));
    });
  dispatch(actions.setLoading(true));
};

const setText = (text) => dispatch => {
  dispatch(actions.setText(text));
};

const play = (uri, repeat) => (dispatch, getState) => {
  if (!getState().spotify.error) {
    SpotifyService.play(uri, repeat)
      .then(() => {
        dispatch(actions.setError(''));
      })
      .catch(error => {
        dispatch(actions.setReady(false));
        dispatch(actions.setError(error));
      });
  }
};

const pause = () => (dispatch, getState) => {
  if (!getState().spotify.error) {
    SpotifyService.pause()
      .then(() => dispatch(actions.setError('')))
      .catch(error => {
        dispatch(actions.setReady(false));
        dispatch(actions.setError(error));
      });
  }
};

const updateState = () => (dispatch, getState) => {
  if (getState().spotify.ready) {
    SpotifyService.updateState()
      .then(() => dispatch(actions.setError('')))
      .catch(error => {
        dispatch(actions.setReady(false));
        dispatch(actions.setError(error));
      });
  }
};

const logout = () => dispatch => {
  dispatch(sessionOperations.setToken(''));
  dispatch(actions.setReady(false));
  dispatch(actions.setError('No token provided'));
};

export {
  load,
  setText,
  play,
  pause,
  updateState,
  logout,
};
