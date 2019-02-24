import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import queryString from 'query-string';
import * as SessionOperations from '../state/ducks/session/operations'

import "../styles/components/welcome.css"
import Modal from './common/modal'
import Button from './common/button';

const mapStateToProps = state => {
  return {
    uuid: state.session.uuid,
    token: state.session.token
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setToken: SessionOperations.setToken,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Welcome extends React.Component {
  componentWillMount() {
    if(this.props.location.hash) {
      let payload = queryString.parse(this.props.location.hash);
      if(payload.state === this.props.uuid) {
        this.props.setToken(payload.access_token);
      }
    }
  }

  render() {
    if(!this.props.token) {
      return (
        <Modal open={true} onClose={() => this.props.goToUrl('')} style={{maxWidth: "500px", textAlign: "center"}}>
          <p style={{marginTop: "0"}}>An error has occurred during the authentication process, please return to home and try again by clicking on the login button.</p>
          <Button onClick={() => this.props.goToUrl('')}>Return home</Button>
        </Modal>
      );
    } else {
      return (
        <div>
          <div id="infoContainer">
            <img id="me" src="/images/img_2.png" alt="Me" />
            <div id="infoText">
              <p>I want to build <span className="highlight-color">the impossible</span> together with badass people that <span className="highlight-color">already do it</span></p>
              <p>So I want to help you build <span className="highlight-color">Spotify</span> coding all day long</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
