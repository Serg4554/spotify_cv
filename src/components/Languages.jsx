import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import * as SpotifyOperations from '../state/ducks/spotify/operations'

import Button from './common/button';
import MusicalLanguages from './MusicalLanguages'

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => bindActionCreators({
  play: SpotifyOperations.play,
  pause: SpotifyOperations.pause,
  setText: SpotifyOperations.setText,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Languages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false
    };
  }

  componentWillMount() {
    this.props.play("spotify:track:2K1zp0p7PVmrBUQu6evtfe", true);
    this.props.setText("Capture the skills somewhere in Stockholm");
  }

  componentWillUnmount() {
    this.props.pause();
  }

  render() {
    return (
      <div className="mainContainer">
        <div id="hangmanInfoContainer">
          <div id="headerText">
            What I earned after <span className="highlight-color">10 years hacking code</span>, 3 of them for a startup and a <span className="highlight-color">Software Engineering degree</span>?
          </div>

          <MusicalLanguages onFinished={() => this.setState({finished: true})} />
        </div>


        <div className="continueButtonContainer">
          <Button
            className="continueButton"
            size="large"
            onClick={() => {}}
          >
            Continue {this.state.finished ? "" : " (Skip)"}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
