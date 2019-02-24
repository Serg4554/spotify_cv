import * as actions from "./actions"
import apiService from "../../apiService";
import crypto from 'crypto';

const setUuid = (uuid) => dispatch => {
  window.localStorage.setItem('uuid', uuid);
  dispatch(actions.setUuid(uuid));
};

const setToken = (token) => dispatch => {
  window.localStorage.setItem('jwt', token);
  apiService.setToken(token);
  return dispatch(actions.setToken(token));
};

const retrieveSession = () => dispatch => {
  const token = window.localStorage.getItem('jwt');
  if(token) {
    apiService.setToken(token);
    dispatch(actions.setToken(token));
  }

  const uuid = window.localStorage.getItem('uuid');
  if(!uuid) {
    crypto.randomBytes(48, (err, buffer) => {
      dispatch(actions.setUuid(buffer.toString('hex')));
    });
  } else {
    dispatch(actions.setUuid(uuid));
  }
};

export {
  setUuid,
  setToken,
  retrieveSession,
}
