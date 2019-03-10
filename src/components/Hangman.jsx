import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import * as SpotifyOperations from '../state/ducks/spotify/operations'

import HangmanFigure from './HangmanFigure';
import Button from './common/button';

const mapStateToProps = state => {
  return {
    ready: state.spotify.ready
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  play: SpotifyOperations.play,
  pause: SpotifyOperations.pause,
  setText: SpotifyOperations.setText,
  goToUrl: url => {
    return push(url)
  }
}, dispatch);

class Hangman extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
      guess: ['', '', '', '', '', '', '', '', '']
    };

    this.letters = [];
  }

  componentWillMount() {
    console.log("//////////////////////////////////////////////////////////////");
    console.log("// I got you!! Trying to hack me and find the solution?? 🤨 //");
    console.log("//      Ok ok... You won, the solution is: THE NIGHTS       //");
    console.log("//////////////////////////////////////////////////////////////");

    this.props.play("spotify:track:0ct6r3EGTcMLPtrXHDvVjc", true);
    this.props.setText("What is the name of the song?");
  }

  componentWillUnmount() {
    this.props.pause();
  }

  handleGuess(id, event) {
    let level = this.state.level;
    let guess = this.state.guess;
    const lost = level >= 6;
    const letter = event.target.value ?
      event.target.value[event.target.value.length - 1].toUpperCase() : "";

    let fail = false;
    switch(id) {
      case 0:
        if(guess[id] !== '') break;
        fail = letter !== 'T';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 1:
        if(guess[id] !== '') break;
        fail = letter !== 'H';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 2:
        if(guess[id] !== '') break;
        fail = letter !== 'E';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 3:
        if(guess[id] !== '') break;
        fail = letter !== 'N';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 4:
        if(guess[id] !== '') break;
        fail = letter !== 'I';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 5:
        if(guess[id] !== '') break;
        fail = letter !== 'G';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 6:
        if(guess[id] !== '') break;
        fail = letter !== 'H';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 7:
        if(guess[id] !== '') break;
        fail = letter !== 'T';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      case 8:
        if(guess[id] !== '') break;
        fail = letter !== 'S';
        if(!fail) {
          guess[id] = letter;
        }
        break;
      default:
        break;
    }

    if(!lost) {
      if(fail) {
        level++;
        if(level >= 6) {
          guess = ['Y', 'O', 'U', 'L', 'O', 'S', 'E', '!', '!'];
          this.letters[id].blur();
        }
      } else if(guess.every(letter => letter !== '')) {
        guess = ['Y', 'O', 'U', 'R', 'O', 'C', 'K', 'S', '!'];
        this.letters[id].blur();
      } else if(id < 8) {
        this.letters[id + 1].focus();
      }
    }

    this.setState({level, guess});
  }

  isTryAgainActive() {
    return this.state.level >= 6 ||
      JSON.stringify(this.state.guess) === JSON.stringify(['Y', 'O', 'U', 'R', 'O', 'C', 'K', 'S', '!']);
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

        {/* HTML STRUCTURE FOR: THE NIGHTS */}
        <div className="hangmanLetters">
          <input
            ref={obj => this.letters[0] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[0]}
            onChange={(e) => this.handleGuess(0, e)}
            autoFocus={true}
          />
          <input
            ref={obj => this.letters[1] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[1]}
            onChange={(e) => this.handleGuess(1, e)} />
          <input
            ref={obj => this.letters[2] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[2]}
            onChange={(e) => this.handleGuess(2, e)} />
          <div style={{display: "inline-block", width: "70px"}} />
          <input
            ref={obj => this.letters[3] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[3]}
            onChange={(e) => this.handleGuess(3, e)} />
          <input
            ref={obj => this.letters[4] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[4]}
            onChange={(e) => this.handleGuess(4, e)} />
          <input
            ref={obj => this.letters[5] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[5]}
            onChange={(e) => this.handleGuess(5, e)} />
          <input
            ref={obj => this.letters[6] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[6]}
            onChange={(e) => this.handleGuess(6, e)} />
          <input
            ref={obj => this.letters[7] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[7]}
            onChange={(e) => this.handleGuess(7, e)} />
          <input
            ref={obj => this.letters[8] = obj}
            className="hangmanLetter"
            type="text"
            value={this.state.guess[8]}
            onChange={(e) => this.handleGuess(8, e)} />
        </div>
        <div id="hangmanLettersCaption">The answer is visible somewhere, will you be able to find it? <span role="img" aria-label=";)">😏</span></div>

        <div className="continueButtonContainer">
          <Button
            className="continueButton"
            size="large"
            onClick={() => {
              this.setState({level: 0, guess: ['', '', '', '', '', '', '', '', '']});
              this.letters[0].focus();
            }}
            enabled={this.isTryAgainActive()}
          >
            Try again
          </Button>
          <Button
            className="continueButton"
            size="large"
            onClick={() => {}}
          >
            Continue {!this.isTryAgainActive() ? " (Skip)" : ""}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hangman);
