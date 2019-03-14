import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { retrieveSession } from "../state/ducks/session/operations"
import * as SpotifyOperations from "../state/ducks/spotify/operations"
import { Route, Switch } from "react-router-dom";
import {push} from "connected-react-router";
import {isMobile} from "react-device-detect";

import '../styles/app.css';
import SnackBar from 'react-material-snackbar';
import ReactLoading from 'react-loading';
import Player from './Player';
import Home from './Home'
import Welcome from './Welcome'
import Hangman from './Hangman'
import Languages from './Languages'
import Projects from './Projects'
import credentials from '../config/credentials';
import Button from "./common/button"
import Modal from './common/modal';


const mapStateToProps = state => ({
  uuid: state.session.uuid,
  location: state.router.location.pathname,
  token: state.session.token,
  loading: state.spotify.loading,
  error: state.spotify.error,
  ready: state.spotify.ready
});

const mapDispatchToProps = dispatch => bindActionCreators({
  retrieveSession,
  loadSpotify: SpotifyOperations.load,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMobileWarning: isMobile
    }
  }
  componentWillMount() {
    this.props.retrieveSession();
    this.props.loadSpotify();
  }

  isPlayerVisible() {
    return this.props.location !== "/" && this.props.location !== "/welcome";
  }

  renderSnackBar() {
    let snackbar;
    if(this.props.loading) {
      snackbar = (
        <SnackBar show={true}>
          <ReactLoading type="bars" height={30} width={30} />
          <span style={{marginLeft: "10px"}}>Connecting to Spotify</span>
        </SnackBar>
      );
    } else if(this.isPlayerVisible() && (!this.props.ready || this.props.error)) {
      snackbar = (
        <SnackBar show={true}>
          <div style={{textAlign: "center"}}>
            Login with Spotify Premium<br/>
            to enjoy the full experience
          </div>
          <Button
            style={{marginLeft: "10px"}}
            size="medium"
            onClick={() => window.location.href = credentials.getAuthUri(this.props.uuid)}
          >
            Login
          </Button>
        </SnackBar>
      );
    }

    return (
      <div
        style={{
          zIndex: 1,
          position: "fixed",
          transform: this.isPlayerVisible() ?
            "translate(-20px, calc(100vh - 110px))" :
            "translate(-20px, calc(100vh - 40px))"
        }}
      >
        {snackbar}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Modal open={this.state.openMobileWarning} onClose={() => this.setState({openMobileWarning: false})}>
          <div className="mobileDialogTitle">Please visit this website from a computer!</div>
          <div className="mobileDialogContent">This application has functions that are only available in modern desktop browsers, such as the Spotify Web Player.</div>
          <div className="mobileDialogContent">So it has not been adapted for mobile use.</div>
          <Button className="mobileDialogButton" size="large" onClick={() => this.setState({openMobileWarning: false})}>Continue anyway</Button>
        </Modal>

        <div className={this.isPlayerVisible() ? "playerContainer" : "container"}>
          <div id="githubContainer" onClick={() => window.open(credentials.githubProject,'_blank')}>
            <div id="githubIcon"/>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/hangman" component={Hangman} />
            <Route exact path="/languages" component={Languages} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
          {this.renderSnackBar()}
        </div>

        <Player
          visible={this.isPlayerVisible()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
