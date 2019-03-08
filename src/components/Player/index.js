import Player from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SpotifyOperations from '../../state/ducks/spotify/operations';

const mapStateToProps = state => {
  return {
    playbackState: state.spotify.playbackState,
    text: state.spotify.text
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateState: SpotifyOperations.updateState,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);