import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { retrieveSession } from "../state/ducks/session/operations"
import * as SpotifyOperations from "../state/ducks/spotify/operations"
import { Route, Switch } from "react-router-dom";
import {push} from "connected-react-router";

import '../styles/app.css';
import Modal from './common/modal'
import Button from './common/button';
import SnackBar from 'react-material-snackbar';
import ReactLoading from 'react-loading';
import Player from './Player';
import Home from './Home'
import Welcome from './Welcome'
import Hangman from './Hangman'


const mapStateToProps = state => ({
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
  componentWillMount() {
    this.props.retrieveSession();
    this.props.loadSpotify();
  }

  isPlayerVisible() {
    return this.props.location !== "/" && this.props.location !== "/welcome";
  }

  getErrorMessage() {
    switch(this.props.error) {
      case "Initialization failed":
        return <p style={{margin: "0"}}>The browser you are using is not compatible <span role="img" aria-label="ops">😖</span></p>;
      case "Authentication failed":
        return <p style={{margin: "0"}}>You need to log in (maybe your session expired) <span role="img" aria-label="ups">😅</span></p>;
      case "Account validation failed":
          return <p style={{margin: "0"}}>You need Spotify Premium! c'mon don't be stingy <span role="img" aria-label=":P">😇</span></p>;
      default:
        return "";
    }
  }

  render() {
    if(this.props.location !== "/" && !!this.props.error) {
      setTimeout(() => {
        this.props.goToUrl('');
      }, 3000);
    }

    return (
      <div>
        <div className={this.isPlayerVisible() ? "playerContainer" : "container"}>
          <div
            style={{
              zIndex: 1,
              position: "fixed",
              transform: this.isPlayerVisible() ? "translate(-20px, calc(100vh - 90px))" : ""
            }}
          >
            <SnackBar show={ this.props.loading} >
              <ReactLoading type="bars" height={30} width={30} />
              <span style={{marginLeft: "10px"}}>Connecting to Spotify</span>
            </SnackBar>
          </div>


          <Modal
            open={this.props.location !== "/" && !!this.props.error}
            onClose={() => this.props.goToUrl('')}
            style={{maxWidth: '600px', textAlign: 'center'}}
          >
            <p>Could not connect to Spotify.</p>
            {this.getErrorMessage()}
            <span>Redirecting to home...</span>
            <div style={{margin: "0 auto", width: "30px"}}>
              <ReactLoading type="bars" height={30} width={30} />
            </div>
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

        <Player
          visible={this.isPlayerVisible()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
