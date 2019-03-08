import React from "react";
import PropTypes from "prop-types";
import style from './style.module.css';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      intervalId: undefined
    }
  }

  componentWillMount() {
    // Update playback position when toggle the tab visibility
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(visibilityChange, this.props.updateState.bind(this), false);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const oldState = this.props.playbackState;
    const newState = nextProps.playbackState;

    if(Object.keys(newState).length !== 0 && JSON.stringify(oldState !== JSON.stringify(newState))) {
      // Play state updated
      this.setState({position: newState.position * 100 / newState.duration});

      if(!oldState.paused && newState.paused) {
        this.stopInterval()
      } else if(oldState.paused !== false && !newState.paused) {
        this.startInterval();
      }
    }
  }

  startInterval() {
    if(this.state.intervalId) {
      this.stopInterval();
    }

    this.intervalTime = Date.now();
    const intervalId = setInterval(() => {
      const time = Date.now();
      const position = this.state.position || 0;
      const timeDiff = time - this.intervalTime;
      const duration = this.props.playbackState.duration || 0;

      if(duration !== 0) {
        this.setState({position: position + (timeDiff * 100) / duration});
      } else if(position >= duration) {
        this.stopInterval();
      }

      this.intervalTime = time;
    }, 100);

    this.setState({intervalId});
  }

  stopInterval() {
    clearInterval(this.state.intervalId);
    this.setState({intervalId: undefined});
  }

  render() {
    const {text, visible} = this.props;


    return (
      <div className={style.player} style={visible ? {} : {visibility: "hidden"}}>
        <div className={style.text}>{text}</div>
        <Progress
          theme={{
            default: {
              symbol: '',
              color: '#1ed760',
              trailColor: '#444'
            }
          }}
          percent={this.state.position}
          status="default"
          strokeWidth={1}
          className={style.progress}
          symbolClassName={style.progressSymbol}
        />
      </div>
    );
  }
}

Player.propTypes = {
  visible: PropTypes.bool
};

Player.defaultProps = {
  visible: true
};

export default Player;