import { api } from '../spotify-api';

export async function spotifyAction() {
  // Req
  api.getUserInfo();
}
