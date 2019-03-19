import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import ReactLoading from 'react-loading';
import credentials from '../../config/credentials';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      intervalId: undefined,
      width: window.innerWidth,
      isMobile: window.innerWidth < 1040,
    };
  }

  componentWillMount() {
    // Update playback position when toggle the tab visibility
    let visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      visibilityChange = 'webkitvisibilitychange';
    }
    document.addEventListener(visibilityChange, this.props.updateState.bind(this), false);
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const oldState = this.props.playbackState;
    const newState = nextProps.playbackState;

    if (Object.keys(newState).length !== 0 && JSON.stringify(oldState !== JSON.stringify(newState))) {
      // Play state updated
      this.setState({position: newState.paused ? 0 : newState.position * 100 / newState.duration});

      if (!oldState.paused && newState.paused) {
        this.stopInterval();
      } else if (oldState.paused !== false && !newState.paused) {
        this.startInterval();
      }
    }

    if (this.props.location !== nextProps.location) {
      if (this.muteElement && this.props.mute) {
        this.muteElement.classList.add(style.highlightMute);
        setTimeout(() => {
          this.muteElement.classList.remove(style.highlightMute);
        }, 500);
      }
    }
  }

  updateWidth() {
    this.setState({
      width: window.innerWidth,
      isMobile: window.innerWidth < 1040,
    });
  };

  startInterval() {
    if (this.state.intervalId) {
      this.stopInterval();
    }

    this.intervalTime = Date.now();
    const intervalId = setInterval(() => {
      const time = Date.now();
      const position = this.state.position || 0;
      const timeDiff = time - this.intervalTime;
      const duration = this.props.playbackState.duration || 0;

      if (duration !== 0) {
        this.setState({position: position + (timeDiff * 100) / duration});
      } else if (position >= duration) {
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

  renderPlayerControlImage() {
    if (this.props.loading) {
      const size = this.state.isMobile ? '6vw' : 30;
      return <ReactLoading type="bars" height={size} width={size} color="#000"/>;
    } else if (!this.props.ready || !!this.props.error) {
      return <img src='/assets/error.svg' alt="mute"/>;
    } else if (this.props.loading) {
      return <img src='/assets/music_off.svg' alt="mute"/>;
    } else {
      return <img src='/assets/music_on.svg' alt="mute"/>;
    }
  }

  render() {
    const {text, visible, mute} = this.props;

    return (
      <div className={style.player} style={visible ? {} : {visibility: 'hidden'}}>
        <div
          ref={obj => this.muteElement = obj}
          className={style.mute}
          onClick={() => {
            if (!this.props.loading && this.props.ready && !this.props.error) {
              this.props.setMute(!mute);
            } else {
              window.location.href = credentials.getAuthUri(this.props.uuid);
            }
          }}
        >
          {this.renderPlayerControlImage()}
        </div>
        <div className={style.text}><span>{text}</span></div>
        <Progress
          theme={{
            default: {
              symbol: '',
              color: '#1ed760',
              trailColor: '#444',
            },
          }}
          type={this.state.isMobile ? 'circle' : ''}
          width={this.state.isMobile ? this.state.width * .162 : undefined}
          strokeWidth={this.state.isMobile ? this.state.width * .02 : 1}
          percent={this.state.position}
          status="default"
          className={style.progress}
          symbolClassName={style.progressSymbol}
        />
      </div>
    );
  }
}

Player.propTypes = {
  visible: PropTypes.bool,
};

Player.defaultProps = {
  visible: true,
};

export default Player;