import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import queryString from 'query-string';
import * as SessionOperations from '../state/ducks/session/operations'
import * as SpotifyOperations from '../state/ducks/spotify/operations'

const mapStateToProps = state => {
  return {
    uuid: state.session.uuid,
    token: state.session.token
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setToken: SessionOperations.setToken,
  loadSpotify: SpotifyOperations.load,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Welcome extends React.Component {
  componentWillMount() {
    if(this.props.location.hash) {
      let payload = queryString.parse(this.props.location.hash);
      if(payload.state === this.props.uuid && this.props.token !== payload.access_token) {
        this.props.setToken(payload.access_token);
        this.props.loadSpotify();
      }
    }
  }

  render() {
    return (
      <div className="mainContainer">
        <div id="welcomeInfoContainer">
          <div id="welcomeImg" />
          <div id="imgText">
            <p id="p1">
              I want to build <span className="highlight-color">the impossible</span> together
              with badass people that <span className="highlight-color">already do it</span>
            </p>
            <p id="p2">So I want to help you build <span className="highlight-color">Spotify</span> coding all day long</p>
          </div>

          <div id="motivation">
            “I don't want to be one more mercenary that makes software by
            requests, without caring. I want to devote my passion to pampering a
            project up to <span style={{color: 'white'}}>perfection</span>”
          </div>

          <div id="adventure">
            <div onClick={() => this.props.goToUrl("/hangman")} id="play"/>
            <p style={{margin: '0'}}>For now, let's start the first <span
              style={{textDecoration: 'line-through'}}>adventure</span> <span
              id="song">song!!</span></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
