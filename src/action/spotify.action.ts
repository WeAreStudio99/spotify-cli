import { terminal } from 'terminal-kit';
import { FileNameEnum } from '../models/files/file.model';
import { IArtist } from '../models/spotify/artist.model';
import { ITrack } from '../models/spotify/tracks.model';
import { api } from '../spotify-api';
import { parseConfigFile } from '../utils/parser.utils';

export async function spotifyAction() {
  // Feed local DB with user data
  //   api.getUserInfo();
  //   api.getUserTopSpotify('artists', 'short_term', 5);
  let seedTracks: string[] = [];
  let seedGenres: string[] = [];
  let seedArtists: string[] = [];

  api.getUserTopSpotify('tracks', { time_range: 'short_term', limit: 5 }).then(async () => {
    const topTracks = await parseConfigFile(FileNameEnum.USER_TOP_TRACKS);
    topTracks.forEach((track: ITrack) => {
      seedTracks.push(track.id);
      seedTracks = seedTracks.splice(0, 5);
    });
    // console.log(seedTracks);
  });

  api.getUserTopSpotify('artists', { time_range: 'short_term', limit: 5 }).then(async () => {
    const topArtists = await parseConfigFile(FileNameEnum.USER_TOP_ARTISTS);
    topArtists.forEach((artist: IArtist) => {
      //   terminal.slowTyping('Your top artists :', { flashStyle: terminal.brightWhite });
      terminal.drawImage(
        artist.images[0].url,
        { shrink: { width: terminal.width, height: terminal.height / 1.5 } },
        () => {
          terminal.slowTyping(artist.name, { flashStyle: terminal.brightWhite });
        },
      );
      seedArtists.push(artist.id);
      artist.genres.forEach((genre) => {
        seedGenres.push(genre);
      });
    });
    seedGenres = seedGenres.splice(0, 5);
    seedArtists = seedArtists.splice(0, 5);
    // console.log(seedGenres);
    // console.log(seedArtists);

    api.getUserRecommendations({
      seed_artists: seedTracks[0],
      seed_genres: 'classical',
      seed_tracks: '0c6xIDDpzE81m2q797ordA',
      limit: 5,
    });
  });
}
