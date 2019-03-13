
export default {
  playerName: "This is me. Serg",
  getAuthUri: (uuid) => "https://accounts.spotify.com/authorize" +
    "?client_id=7fd1e1e916ad43679ae2a30ddd43e728" +
    "&response_type=token" +
    "&redirect_uri=" + encodeURI("http://localhost:3000" + "/welcome") +
    "&state=" + uuid +
    "&scope=" + encodeURI("streaming user-read-birthdate user-read-email user-read-private user-read-playback-state user-modify-playback-state")
}
