import * as actions from "./actions"
import SpotifyService from "../../SpotifyService";

const setLoading = (loading) => dispatch => {
  return dispatch(actions.setLoading(loading));
};

const setError = (error) => dispatch => {
  return dispatch(actions.setError(error));
};

const setReady = (ready) => dispatch => {
  return dispatch(actions.setReady(ready));
};

const play = (uri) => () => {
  return new Promise((resolve, reject) => {
    if(!SpotifyService.isReady()) {
      SpotifyService.onReady((ready) => {
        SpotifyService.play(uri);
        ready ? resolve() : reject();
      })
    } else {
      SpotifyService.play(uri);
      resolve();
    }
  });
};

export {
  setLoading,
  setError,
  setReady,
  play
}
