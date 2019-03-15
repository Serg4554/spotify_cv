import credentials from '../config/credentials';
import SpotifyWebApi from 'spotify-web-api-js';

const Spotify = new SpotifyWebApi();

let device = '';
let ready = false;
let waitingToPlay = {};
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
        if (waitingToPlay.uri) {
          playPromise(waitingToPlay);
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

const onStateChanged = cb => {
  stateListeners.push(cb);
};

function checkResponse(promise, accept, reject) {
  promise
    .then((res) => accept(res))
    .catch((res) => {
      const response = JSON.parse(res.response);
      if (response && response.error) {
        if (response.error.reason === 'PREMIUM_REQUIRED') {
          return reject('Account validation failed');
        }
      }
      reject(res.response.message);
    });
}

function playPromise({uri, accept, reject}) {
  waitingToPlay = {};
  checkResponse(Spotify.play({device_id: device, uris: [uri]}), () => {
    setTimeout(() => {
      checkResponse(Spotify.setRepeat(repeat ? 'track' : 'off'), accept, reject);
    }, 1000);
  }, reject);
}

const play = (uri, _repeat) => new Promise((accept, reject) => {
  repeat = _repeat;
  waitingToPlay = {uri, accept, reject};
  if (ready) {
    playPromise(waitingToPlay);
  }
});

const pause = () => new Promise((accept, reject) => {
  if (device) {
    checkResponse(Spotify.pause({device_id: device}), accept, reject);
  } else {
    accept();
  }
});

const updateState = () => new Promise((accept, reject) => {
  if (device) {
    checkResponse(Spotify.getMyCurrentPlaybackState(), (res) => {
      const state = {
        duration: res.item ? res.item.duration_ms || 0 : 0,
        paused: !res.is_playing,
        position: res.progress_ms,
      };
      stateListeners.forEach(cb => cb(state));
      accept();
    }, reject);
  }
});

export default {
  setToken,
  load,
  onStateChanged,
  play,
  pause,
  updateState,
};
