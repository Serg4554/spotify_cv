import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import * as SessionOperations from '../state/ducks/session/operations'

import Button from './common/button';
import HangmanFigure from './HangmanFigure';

const mapStateToProps = state => {
  return {
    token: state.session.token
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setToken: SessionOperations.setToken,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Hangman extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0
    }
  }
  render() {
    return (
      <div className="mainContainer">
        <div id="hangmanInfoContainer">
          <div id="hangmanImg">
            <figcaption>Music was always my 2nd passion</figcaption>
          </div>

          <div id="imgText">
            <p id="p1">
              I <span className="highlight-color">love software</span> since I was born, so I would say I'm made for this. That's why I <span className="highlight-color">care everything I do</span>
            </p>
            <p id="p2">So please, don't kill my <span className="highlight-color">stickman</span>!!</p>
          </div>

          <HangmanFigure id="hangmanFigure" level={this.state.level} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hangman);
