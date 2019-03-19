import Player from './component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SpotifyOperations from '../../state/ducks/spotify/operations';

const mapStateToProps = state => {
  return {
    loading: state.spotify.loading,
    ready: state.spotify.ready,
    error: state.spotify.error,
    location: state.router.location.pathname,
    playbackState: state.spotify.playbackState,
    text: state.spotify.text,
    mute: state.spotify.mute,
    uuid: state.session.uuid,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setMute: SpotifyOperations.setMute,
  updateState: SpotifyOperations.updateState,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);