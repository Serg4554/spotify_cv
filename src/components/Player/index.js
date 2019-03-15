import Player from './component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SpotifyOperations from '../../state/ducks/spotify/operations';

const mapStateToProps = state => {
  return {
    location: state.router.location.pathname,
    playbackState: state.spotify.playbackState,
    text: state.spotify.text,
    mute: state.spotify.mute,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setMute: SpotifyOperations.setMute,
  updateState: SpotifyOperations.updateState,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);