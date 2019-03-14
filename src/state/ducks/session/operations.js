import * as actions from './actions';
import * as SpotifyOperations from '../spotify/operations';
import SpotifyService from '../../SpotifyService';
import crypto from 'crypto';

const setToken = (token) => dispatch => {
  window.localStorage.setItem('jwt', token);
  SpotifyService.setToken(token);
  return dispatch(actions.setToken(token));
};

const retrieveSession = () => dispatch => {
  const token = window.localStorage.getItem('jwt');
  if (token) {
    dispatch(actions.setToken(token));
    SpotifyService.setToken(token);
    SpotifyOperations.load();
  }

  const uuid = window.localStorage.getItem('uuid');
  if (!uuid) {
    const uuid = crypto.randomBytes(48).toString('hex');
    window.localStorage.setItem('uuid', uuid);
    dispatch(actions.setUuid(uuid));
  } else {
    dispatch(actions.setUuid(uuid));
  }
};

export {
  setToken,
  retrieveSession,
};
