import axios from 'axios';
import { URL } from 'url';
import { bearer } from '../auth';
import { FileNameEnum } from '../models/files/file.model';
import { IPaging } from '../models/spotify/paging.model';
import { IRecommendations } from '../models/spotify/recommandation.model';
import { writeDataFile } from '../templates/data/data.template';

export async function getUserInfo() {
  bearer.initAuthToken$.subscribe({
    complete: () => {
      const interval = setInterval(() => {}, 100);
      axios
        .get<IPaging>('https://api.spotify.com/v1/me')
        .then((res) => {
          writeDataFile(FileNameEnum.USER_DATA, res.data);
          //   loadingUserBar.update(100);
          clearInterval(interval);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}

export async function getUserTopSpotify(
  type: 'artists' | 'tracks',
  topUserQueryObject: {
    // eslint-disable-next-line camelcase
    time_range: 'long_term' | 'medium_term' | 'short_term';
    limit: number;
  },
) {
  const url = new URL(`https://api.spotify.com/v1/me/top/${type}`);

  Object.entries(topUserQueryObject).forEach((entry) => {
    const [key, value] = entry;
    url.searchParams.append(key, value.toString());
  });

  bearer.initAuthToken$.subscribe({
    complete: () => {
      axios
        .get<IPaging>(url.href)
        .then((res) => {
          writeDataFile(
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

export async function getUserRecommendations(recommendantionQueryObject: IRecommendations) {
  const url = new URL('https://api.spotify.com/v1/recommendations');

  Object.entries(recommendantionQueryObject).forEach((entry) => {
    const [key, value] = entry;
    url.searchParams.append(key, value);
  });

  bearer.initAuthToken$.subscribe({
    complete: () => {
      axios
        .get(url.href)
        .then((res) => {
          writeDataFile(FileNameEnum.USER_RECOMMENDATIONS, res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}
