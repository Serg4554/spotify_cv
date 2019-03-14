const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
const spotifyScopes = [
  'streaming',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
];

export default {
  playerName: 'This is me. Serg',
  resume: '/files/resume.pdf',
  github: 'https://github.com/Serg4554',
  githubProject: 'https://github.com/Serg4554/spotify_cv',
  linkedin: 'https://www.linkedin.com/in/serg357',
  getAuthUri: (uuid) => 'https://accounts.spotify.com/authorize' +
    '?client_id=7fd1e1e916ad43679ae2a30ddd43e728' +
    '&response_type=token' +
    '&redirect_uri=' + encodeURI(url + '/welcome') +
    '&state=' + uuid +
    '&scope=' + encodeURI(spotifyScopes.join(' ')),
};
