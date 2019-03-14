import * as actions from './actions';
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

const play = (uri, repeat) => () => {
  SpotifyService.play(uri, repeat);
};

const pause = () => () => {
  SpotifyService.pause();
};

const updateState = () => () => {
  SpotifyService.updateState();
};

export {
  load,
  setText,
  play,
  pause,
  updateState,
};
