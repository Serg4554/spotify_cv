import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import credentials from '../config/credentials.json';
const agent = superagentPromise(_superagent, Promise);

const API_URL = credentials.apiUrl;
let token = null;

const setToken = (req, token) => {
  if(token) {
    req.set('authorization', token)
  }
};

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
const reviver = (key, value) => {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

const requests = {
  get: (url, _token) =>
    agent.get(`${API_URL}${url}`)
      .use(req => setToken(req, _token || token))
      .then(res => JSON.parse(JSON.stringify(res.body || {}), reviver)),
  post: (url, body, _token) =>
    agent.post(`${API_URL}${url}`, body)
      .use(req => setToken(req, _token || token))
      .then(res => JSON.parse(JSON.stringify(res.body || {}), reviver)),
  put: (url, body, _token) =>
    agent.put(`${API_URL}${url}`, body)
      .use(req => setToken(req, _token || token))
      .then(res => JSON.parse(JSON.stringify(res.body || {}), reviver)),
  del: (url, _token) =>
    agent.del(`${API_URL}${url}`)
      .use(req => setToken(req, _token || token))
      .then(res => JSON.parse(JSON.stringify(res.body || {}), reviver)),
};


//TODO: API requests

export default {
  setToken: _token => { token = _token }
};
