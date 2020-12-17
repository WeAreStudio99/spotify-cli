// import { auth, getTokenInKeychain } from './auth/spotify-auth';
import { api } from './spotify-api';
// import { showTitleAndBanner } from './utils/logger.utils';

import { authAction$ } from './action/auth.action';

// import { keychain } from './auth';

export async function spotifyHl() {
  authAction$.subscribe({
    complete: () => {
      api.getUserInfo();
      api.getUserTopSpotify('tracks', 'long_term', 1);
    },
  });
}
