import credentials from '../config/credentials.json';
import SpotifyWebApi from 'spotify-web-api-js';

const Spotify = new SpotifyWebApi();

let ready = false;
let webPlayerReady = false;
let device_id = '';
let readyListeners = [];
let statusListeners = [];
let authenticationErrorListeners = [];

window.onSpotifyWebPlaybackSDKReady = () => {
  webPlayerReady = true;
  load();
};

const setToken = token => {
  Spotify.setAccessToken(token);
  load();
};

const getToken = () => {
  return Spotify.getAccessToken();
};

function load() {
  if (Spotify.getAccessToken() && webPlayerReady) {
    const player = new window.Spotify.Player({
      name: credentials.playerName,
      getOAuthToken: cb => cb(Spotify.getAccessToken()),
    });

    // Errors
    player.addListener('initialization_error', ({message}) => {
      console.error(message);
    });
    player.addListener('authentication_error', ({message}) => {
      console.error(message);
      if(message === "Authentication failed") {
        authenticationErrorListeners.forEach(cb => cb());
      }
    });
    player.addListener('account_error', ({message}) => {
      console.error('account_error', message);
    });
    player.addListener('playback_error', ({message}) => {
      console.error('playback_error', message);
    });

    // Status
    player.addListener('player_state_changed', state => {
      statusListeners.forEach(cb => cb(state));
    });

    // Ready
    player.addListener('ready', (player) => {
      device_id = player.device_id;
      ready = true;
      readyListeners.forEach(cb => cb(ready));
    });

    // Not ready
    player.addListener('not_ready', () => {
      device_id = '';
      ready = false;
      readyListeners.forEach(cb => cb(ready));
    });

    player.connect();
  }
}

const isReady = () => {
  return ready;
};

const onReady = cb => {
  readyListeners.push(cb);
};

const onStatus = cb => {
  statusListeners.push(cb);
};

const onAuthenticationError = cb => {
  authenticationErrorListeners.push(cb);
};

const play = (uri) => Spotify.play({device_id, uris: [uri]});

export default {
  setToken,
  getToken,
  isReady,
  onReady,
  onStatus,
  onAuthenticationError,
  play,
};
