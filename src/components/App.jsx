import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import {retrieveSession} from '../state/ducks/session/operations';
import * as SpotifyOperations from '../state/ducks/spotify/operations';
import {Route, Switch} from 'react-router-dom';
import {push} from 'connected-react-router';

import '../styles/app.css';
import SnackBar from 'react-material-snackbar';
import ReactLoading from 'react-loading';
import Player from './Player';
import Home from './Home';
import Welcome from './Welcome';
import Hangman from './Hangman';
import Languages from './Languages';
import Projects from './Projects';
import credentials from '../config/credentials';
import Button from './common/button';
import Modal from './common/modal';

const mapStateToProps = state => ({
  uuid: state.session.uuid,
  location: state.router.location.pathname,
  token: state.session.token,
  loading: state.spotify.loading,
  error: state.spotify.error,
  ready: state.spotify.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  retrieveSession,
  loadSpotify: SpotifyOperations.load,
  logoutSpotify: SpotifyOperations.logout,
  goToUrl: url => push(url),
}, dispatch);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: window.innerWidth < 1040,
    };
  }

  componentWillMount() {
    this.props.retrieveSession();
    this.props.loadSpotify();
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  updateWidth() {
    this.setState({
      isMobile: window.innerWidth < 1040,
    });
  };

  isPlayerVisible() {
    return this.props.location !== '/' && this.props.location !== '/welcome';
  }

  getErrorMessage() {
    switch (this.props.error) {
      case 'Initialization failed':
        return (
          <div>
            <p>Ops! We couldn't initialize the music player <span role="img" aria-label="ops">😖</span></p>
            <p>Make sure the address starts with https:// or try to use another browser</p>
          </div>
        );
      case 'Account validation failed':
        return (
          <div>
            <p>You need Spotify Premium to listed the music <span role="img" aria-label="ups">😅</span></p>
            <p>But don't worry, you can continue without music! <span role="img" aria-label=":D">😁</span></p>
          </div>
        );
      default:
        return '';
    }
  }

  renderSnackBar() {
    let snackbar;
    if (!this.state.isMobile && this.props.loading) {
      snackbar = (
        <SnackBar show={true}>
          <ReactLoading type="bars" height={30} width={30}/>
          <span style={{marginLeft: '10px'}}>Connecting to Spotify</span>
        </SnackBar>
      );
    } else if (!this.state.isMobile && this.isPlayerVisible() && (!this.props.ready || this.props.error)) {
      snackbar = (
        <SnackBar show={true}>
          <div style={{textAlign: 'center'}}>
            Login with Spotify Premium<br/>
            to enjoy the full experience
          </div>
          <Button
            style={{marginLeft: '10px'}}
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
          position: 'fixed',
          transform: this.isPlayerVisible() ?
            'translate(-20px, calc(100vh - 110px))' :
            'translate(-20px, calc(100vh - 40px))',
        }}
      >
        {snackbar}
      </div>
    );
  }

  renderErrorWarning() {
    return (
      <Modal
        open={!!this.getErrorMessage()}
        onClose={() => this.props.logoutSpotify()}
        classNames={{modal: 'errorMessage'}}
      >
        {this.getErrorMessage()}
        <Button style={{textAlign: 'center', marginTop: '10px'}} onClick={() => this.props.logoutSpotify()}>OK</Button>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <div className={this.isPlayerVisible() ? 'playerContainer' : 'container'}>
          {this.renderSnackBar()}
          {this.renderErrorWarning()}

          <div id="githubContainer" onClick={() => window.open(credentials.githubProject, '_blank')}>
            <div id="githubIcon"/>
          </div>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/welcome" component={Welcome}/>
            <Route exact path="/hangman" component={Hangman}/>
            <Route exact path="/languages" component={Languages}/>
            <Route exact path="/projects" component={Projects}/>
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
