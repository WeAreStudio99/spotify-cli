import { api } from '../spotify-api';

export async function spotifyAction() {
  // Req
  api.getUserInfo();
  api.getUserTopSpotify('artists', 'short_term', 10);
}
