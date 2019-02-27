import * as actions from "./actions"
import SpotifyService from "../../SpotifyService";

const load = () => dispatch => {
  SpotifyService.pause();
  SpotifyService.load()
    .then(ready => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setReady(ready));
      dispatch(actions.setError(""));
    })
    .catch(error => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setReady(false));
      dispatch(actions.setError(error));
    });
  dispatch(actions.setLoading(true));
};

const play = (uri) => () => {
  SpotifyService.play(uri);
};

export {
  load,
  play
}
