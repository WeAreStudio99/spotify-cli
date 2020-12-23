import { FileNameEnum } from '../models/file.model';
import { ITracks } from '../models/spotify/tracks.model';
import { api } from '../spotify-api';
import { parseConfigFile } from '../utils/parser.utils';

export async function spotifyAction() {
  // Feed local DB with user data
  //   api.getUserInfo();
  //   api.getUserTopSpotify('artists', 'short_term', 5);
  api.getUserTopSpotify('tracks', { time_range: 'short_term', limit: 5 }).then(async () => {
    const topTracks = await parseConfigFile(FileNameEnum.USER_TOP_TRACKS);
    topTracks.forEach((tracks: ITracks) => {
      console.log(tracks.name);
      tracks.artists.forEach((artist) => {
        console.log(artist.name);
      });
      console.log('______');
    });
  });
  //   api.getUserRecommendations({
  //     seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
  //     seed_genres: 'classical',
  //     seed_tracks: '0c6xIDDpzE81m2q797ordA',
  //     limit: 5,
  //   });
}
