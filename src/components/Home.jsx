import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import credentials from "../config/credentials.json"

import Button from "./common/button"
import "../styles/components/home.css"

const mapStateToProps = state => {
  return {
    uuid: state.session.uuid
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Home extends React.Component {
  componentDidMount() {
    console.log(document.cookie);
    setTimeout(() => {
      this.welcomeMsg.className += ' animate';
    }, 500);
    setTimeout(() => {
      this.welcomeMsg.className += ' hv-center-hidden';
    }, 1500);
    setTimeout(() => {
      this.welcomeMsg.className += ' no-display';
      this.content.className = this.content.className.replace(' no-display', '');
    }, 2500);
    setTimeout(() => {
      this.content.className = this.content.className.replace(' transparent', '');
    }, 2600);
  }

  render() {
    return (
      <div>
        <div ref={obj => this.welcomeMsg = obj} id="welcomeMsg">
          <h1  className="hv-center text-size-huge">This is me</h1>
        </div>

        <div ref={obj => this.content = obj} className="text-center animate no-display transparent">
          <h1 id="helloMsg" className="text-size-huge">
            <div>Hello <span className="highlight-color">Spotify</span>, I'm Serg</div>
            <div id="clarification" className="text-size-small">(Well... officially Sergio)</div>
          </h1>

          <img className="image" src="/images/img_1.png" alt="This is me"/>
          <div id="premiumRequired">
            You need <span className="highlight-color">Spotify Premium</span> to enjoy the experience
            <object id="arrow" data="/assets/arrow.svg" type="image/svg+xml" />
          </div>

          <Button
            id="login"
            onClick={() => {
              window.location.href = "https://accounts.spotify.com/authorize" +
                "?client_id=" + credentials.clientId +
                "&response_type=token" +
                "&redirect_uri=" + encodeURI(credentials.url + "/welcome") +
                "&state=" + this.props.uuid;
            }}
          >
            Login to continue
          </Button>
          <div id="tip" className="text-size-small">Tip: Turn up the volume or improve your
            extrasensory powers 😉
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
