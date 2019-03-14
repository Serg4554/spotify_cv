import credentials from '../config/credentials';
import SpotifyWebApi from 'spotify-web-api-js';

const Spotify = new SpotifyWebApi();

let device = '';
let ready = false;
let waitingToPlay = '';
let stateListeners = [];
let repeat = false;

const setToken = token => {
  Spotify.setAccessToken(token);
};

const load = () => {
  return new Promise((resolve, reject) => {
    function loadWebPlayer() {
      if (!Spotify.getAccessToken()) {
        return reject('No token provided');
      }

      const player = new window.Spotify.Player({
        name: credentials.playerName,
        getOAuthToken: cb => cb(Spotify.getAccessToken()),
      });

      player.addListener('initialization_error', () => {
        reject('Initialization failed'); // Unsupported browser
      });

      player.addListener('authentication_error', () => {
        reject('Authentication failed'); // Invalid token
      });

      player.addListener('account_error', () => {
        reject('Account validation failed'); // No Spotify Premium
      });

      // State changed
      player.addListener('player_state_changed', res => {
        const state = {
          duration: res ? res.duration : 0,
          paused: res ? res.paused : true,
          position: res ? res.position : 0,
        };
        stateListeners.forEach(cb => cb(state));
      });

      // Ready
      player.addListener('ready', ({device_id}) => {
        device = device_id;
        ready = true;
        resolve(ready);
        if (waitingToPlay) {
          play(waitingToPlay, repeat);
          waitingToPlay = '';
        }
      });

      // Not ready (usually no internet connection)
      player.addListener('not_ready', ({device_id}) => {
        device = device_id;
        ready = false;
        resolve(ready);
      });

      player.connect();
    }

    if (!window.Spotify) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        loadWebPlayer();
      };
    } else {
      loadWebPlayer();
    }
  });
};

const isReady = () => {
  return ready;
};

const onStateChanged = cb => {
  stateListeners.push(cb);
};

const play = (uri, _repeat) => {
  repeat = _repeat;
  if (ready) {
    Spotify.play({device_id: device, uris: [uri]})
      .then(() => {
        setTimeout(() => {
          if (repeat) {
            Spotify.setRepeat('track');
          } else {
            Spotify.setRepeat('off');
          }
        }, 1000);
      });
  } else {
    waitingToPlay = uri;
  }
};

const pause = () => {
  if (device) {
    Spotify.pause({device_id: device});
  }
};

const updateState = () => {
  if (device) {
    Spotify.getMyCurrentPlaybackState()
      .then(res => {
        const state = {
          duration: res.item ? res.item.duration_ms || 0 : 0,
          paused: !res.is_playing,
          position: res.progress_ms,
        };
        stateListeners.forEach(cb => cb(state));
      });
  }
};

export default {
  setToken,
  load,
  isReady,
  onStateChanged,
  play,
  pause,
  updateState,
};
