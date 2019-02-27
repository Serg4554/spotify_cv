import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { retrieveSession } from "../state/ducks/session/operations"
import * as SpotifyOperations from "../state/ducks/spotify/operations"
import { Route, Switch } from "react-router-dom";
import SpotifyService from '../state/SpotifyService';
import {push} from "connected-react-router";

import '../styles/app.css';
import Modal from './common/modal'
import Button from './common/button';
import SnackBar from 'react-material-snackbar';
import ReactLoading from 'react-loading';
import Home from './Home'
import Welcome from './Welcome'
import Hangman from './Hangman'


const mapStateToProps = state => ({
  location: state.router.location.pathname,
  token: state.session.token,
  loading: state.spotify.loading,
  error: state.spotify.error,
  ready: state.spotify.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  retrieveSession,
  setLoading: SpotifyOperations.setLoading,
  setReady: SpotifyOperations.setReady,
  setError: SpotifyOperations.setError,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class App extends Component {
  componentWillMount() {
    this.props.retrieveSession();

    if(SpotifyService.getToken()) {
      this.props.setLoading(true);
    }

    SpotifyService.onReady((ready) => {
      this.props.setLoading(false);
      this.props.setReady(ready);
    });
    SpotifyService.onAuthenticationError(() => {
      this.props.setLoading(false);
      this.props.setError(true);
    });
  }

  render() {
    if(this.props.location !== "/" && this.props.error) {
      setTimeout(() => {
        this.props.goToUrl('');
      }, 3000);
    }

    return (
      <div className="container">
        <SnackBar show={ this.props.loading}>
          <ReactLoading type="bars" height={30} width={30} />
          <span style={{marginLeft: "10px"}}>Connecting to Spotify</span>
        </SnackBar>

        <Modal
          open={this.props.location !== "/" && this.props.error}
          onClose={() => this.props.goToUrl('')}
          style={{maxWidth: '500px', textAlign: 'center'}}
        >
          Could not connect a Spotify. Redirecting to home...
        </Modal>

        <Modal
          open={this.props.location !== "/" && !this.props.token}
          onClose={() => this.props.goToUrl('')}
          style={{maxWidth: '500px', textAlign: 'center'}}
        >
          <p style={{margin: '0 0 30px 0'}}>An error has occurred during the
            authentication process, please return to home and try again by
            clicking on the login button.</p>
          <Button onClick={() => this.props.goToUrl('')}>Return home</Button>
        </Modal>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/hangman" component={Hangman} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
