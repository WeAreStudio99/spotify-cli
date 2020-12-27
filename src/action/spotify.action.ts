// import { terminal } from 'terminal-kit';
// import { FileNameEnum } from '../models/files/file.model';
// import { IArtist } from '../models/spotify/artist.model';
// import { ITrack } from '../models/spotify/tracks.model';
// import { api } from '../spotify-api';
// import { termConfig } from '../templates/term';
// import Logger from '../utils/logger.utils';
// import { parseConfigFile } from '../utils/parser.utils';

import { terminal } from 'terminal-kit';
import { environment } from '../environments/environment';
import { FileNameEnum } from '../models/files/file.model';
import { IArtist } from '../models/spotify/artist.model';
import SpotifyApi from '../spotify-api/data.api';
import { Logger } from '../utils/logger.utils';
import { parseConfigFile } from '../utils/parser.utils';

// export async function spotifyAction() {
//   // Feed local DB with user data
//   //   api.getUserInfo();
//   //   api.getUserTopSpotify('artists', 'short_term', 5);
//   let seedTracks: string[] = [];
//   let seedGenres: string[] = [];
//   let seedArtists: string[] = [];

//   api.getUserTopSpotify('tracks', { time_range: 'short_term', limit: 5 }).then(async () => {
//     const topTracks = await parseConfigFile(FileNameEnum.USER_TOP_TRACKS);
//     topTracks.forEach((track: ITrack) => {
//       seedTracks.push(track.id);
//       seedTracks = seedTracks.splice(0, 5);
//     });
//     // console.log(seedTracks);
//   });

//   api.getUserTopSpotify('artists', { time_range: 'long_term', limit: 5 }).then(async () => {
//     const topArtists = await parseConfigFile(FileNameEnum.USER_TOP_ARTISTS);

//     // Log first artist

//     // terminal.slowTyping(
//     //   //   `[ek] > I think you're a big fan of ${topArtists[0].name} for the past years !!\n\n`,
//     // //   termConfig.slowTypingConfig,
//     //   () => {
//     //     terminal.drawImage(topArtists[0].images[0].url, {
//     //       shrink: { width: terminal.width, height: terminal.height / 1.2 },
//     //     });
//     //   },
//     // );

//     topArtists.forEach((artist: IArtist) => {
//       //   terminal.slowTyping('Your top artists :', { flashStyle: terminal.brightWhite });
//       //   terminal.drawImage(
//       //     artist.images[0].url,
//       //     { shrink: { width: terminal.width, height: terminal.height / 1.2 } },
//       //     () => {
//       //       terminal.blink(`# ${artist.name}\n\n`);
//       //     },
//       //   );
//       seedArtists.push(artist.id);
//       artist.genres.forEach((genre) => {
//         seedGenres.push(genre);
//       });
//     });
//     seedGenres = seedGenres.splice(0, 5);
//     seedArtists = seedArtists.splice(0, 5);
//     // console.log(seedGenres);
//     // console.log(seedArtists);

//     api.getUserRecommendations({
//       seed_artists: seedTracks[0],
//       seed_genres: 'classical',
//       seed_tracks: '0c6xIDDpzE81m2q797ordA',
//       limit: 5,
//     });
//   });
// }

export default class SpotifyAction {
  constructor() {
    const logger = new Logger();
    const spotifyApi = new SpotifyApi();

    logger.showChat(environment.botName, 'Wait 2sec, I m getting ur data').then(() => {
      spotifyApi
        .getUserTopSpotify('artists', { time_range: 'medium_term', limit: 5 })
        .then(async () => {
          await logger.showChat(environment.botName, 'Ok, let see...').then(async () => {
            const topArtists: IArtist[] = await parseConfigFile(FileNameEnum.USER_TOP_ARTISTS);
            logger
              .showChat(environment.botName, `I think you're a big fan of ${topArtists[0].name}`)
              .then(() => {
                terminal.drawImage(topArtists[0].images[0].url, {
                  shrink: { width: terminal.width, height: terminal.height / 1.2 },
                });
              })
              .then(() => {});
          });
        });
    });
  }
}
