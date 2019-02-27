import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import credentials from "../config/credentials.json"

import Button from "./common/button"

const mapStateToProps = state => {
  return {
    uuid: state.session.uuid,
    loading: state.spotify.loading,
    ready: state.spotify.ready,
    error: state.spotify.error,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.timeouts = [];
  }
  componentWillUnmount() {
    this.timeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
  }

  componentDidMount() {
    this.timeouts.push(setTimeout(() => {
      this.welcomeMsg.classList.add("animateHome");
    }, 500));
    this.timeouts.push(setTimeout(() => {
      this.welcomeMsg.classList.add("hv-center-hidden");
    }, 1500));
    this.timeouts.push(setTimeout(() => {
      this.welcomeMsg.classList.add("no-display");
      this.content.classList.remove("no-display");
    }, 2500));
    this.timeouts.push(setTimeout(() => {
      this.content.classList.remove("transparent");
    }, 2600));
  }

  render() {
    const {loading, ready, error} = this.props;

    return (
      <div>
        <div ref={obj => this.welcomeMsg = obj} id="welcomeMsg">
          <h1  className="hv-center text-size-huge">This is me</h1>
        </div>

        <div ref={obj => this.content = obj} className="text-center animateHome no-display transparent">
          <h1 id="helloMsg" className="text-size-huge">
            <div>Hello <span className="highlight-color">Spotify</span>, I'm Serg</div>
            <div id="clarification" className="text-size-small">(Well... officially Sergio)</div>
          </h1>

          <img id="me" src="/images/img_1.png" alt="This is me"/>
          <div id="premiumRequired">
            You need <span className="highlight-color">Spotify Premium</span> to enjoy the experience
            <img id="arrow" src="/assets/arrow.svg" alt="arrow" />
          </div>

          <Button
            id="login"
            size="large"
            onClick={() => {
              if(!loading && ready && !error) {
                this.props.goToUrl("/welcome");
              } else {
                window.location.href = "https://accounts.spotify.com/authorize" +
                  "?client_id=" + credentials.clientId +
                  "&response_type=token" +
                  "&redirect_uri=" + encodeURI(credentials.url + "/welcome") +
                  "&state=" + this.props.uuid +
                  "&scope=" + encodeURI("streaming user-read-birthdate user-read-email user-read-private");
              }
            }}
          >
            {!loading && ready && !error ? "Click" : "Login"} to continue
          </Button>
          <div id="tip" className="text-size-small">Tip: Turn up the volume or improve your
            extrasensory powers <span role="img" aria-label="wink">😉</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
