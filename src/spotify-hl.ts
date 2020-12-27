// import { auth, getTokenInKeychain } from './auth/spotify-auth';
// import { api } from './spotify-api';
// import { showTitleAndBanner } from './utils/logger.utils';

import { authAction$ } from './action/auth.action';
import SpotifyAction from './action/spotify.action';
// import { welcomeQuestion } from './questions/welcome.question';

// import { keychain } from './auth';

// export async function spotifyHl() {
//   authAction$.subscribe({
//     complete: () => {
//       setTimeout(async () => {
//         new spotifyAction();
//       }, 2000);
//       //     //   setTimeout(() => {}, 2000);
//       //     //   welcomeQuestion().subscribe({
//       //     //     complete: async () => {
//       //     //       console.log('finish');

//       //     //     },
//       //     //   });
//     },
//   });
// }

export default class SpotifyHl {
  constructor() {
    authAction$.subscribe({
      complete: () => {
        setTimeout(async () => new SpotifyAction(), 2000);
      },
    });
  }
}
