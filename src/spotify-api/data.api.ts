import axios from 'axios';
import { URL } from 'url';
import { auth, bearer } from '../auth';
import { FileNameEnum } from '../models/files/file.model';
import { IPaging } from '../models/spotify/paging.model';
import { IRecommendations } from '../models/spotify/recommandation.model';
import { writeDataFile } from '../templates/data/data.template';

/**
 * @description
 *
 *  Access the Spotify catalog and user data.
 *
 */
export default class SpotifyApi {
  private urlStandard = 'https://api.spotify.com/v1';

  private urlMe = `${this.urlStandard}/me`;

  /**
   * @description
   *
   * Get detailed profile information about the current
   * user (including the current user’s username) and store data in `.config/user_data.json`
   *
   * @see [User Endpoint Guide](https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/).
   *
   */
  getUserInfo() {
    bearer.initAuthToken$.subscribe({
      complete: () => {
        const interval = setInterval(() => {}, 100);
        axios
          .get<IPaging>(`${this.urlMe}`)
          .then((res) => {
            writeDataFile(FileNameEnum.USER_DATA, res.data);
            //   loadingUserBar.update(100);
            clearInterval(interval);
          })
          .catch((err) => {
            if (err.statusCode === 401) {
              auth.authorizationRequest().subscribe();
            }
          });
      },
    });
  }

  /**
   * @description
   *
   * Get the current user’s top artists or tracks based on calculated affinity
   * and store data in `.config/user_top_artists.json` or `.config/user_top_tracks.json`
   *
   * @see [Personalization Endpoint Guide](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/).
   *
   * @param {string}  time_range - A string param to define the time range.
   * @param {object} topUserQueryObject - An object with multiple query parameters
   */
  async getUserTopSpotify(
    type: 'artists' | 'tracks',
    topUserQueryObject: {
      // eslint-disable-next-line camelcase
      time_range: 'long_term' | 'medium_term' | 'short_term';
      limit: number;
    },
  ): Promise<void> {
    const url = new URL(`${this.urlMe}/top/${type}`);

    Object.entries(topUserQueryObject).forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value.toString());
    });

    bearer.initAuthToken$.subscribe({
      complete: async () => {
        await axios
          .get<IPaging>(url.href)
          .then(async (res) => {
            await writeDataFile(
              type === 'tracks' ? FileNameEnum.USER_TOP_TRACKS : FileNameEnum.USER_TOP_ARTISTS,
              res.data.items,
            );
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  /**
   * @description
   *
   * Create a playlist-style listening experience based on seed artists, tracks and genres
   * and store data in `.config/user_recommendations.json`
   *
   * @see [Personalization Endpoint Guide](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/).
   *
   * @param recommendantionQueryObject {import('../models/spotify/recommandation.model').
   * IRecommendations
   * } - An object with multiple query parameters
   */
  async getUserRecommendations(recommendantionQueryObject: IRecommendations) {
    const url = new URL(`${this.urlStandard}/recommendations`);

    Object.entries(recommendantionQueryObject).forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });

    bearer.initAuthToken$.subscribe({
      complete: async () => {
        await axios
          .get(url.href)
          .then(async (res) => {
            await writeDataFile(FileNameEnum.USER_RECOMMENDATIONS, res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }
}
