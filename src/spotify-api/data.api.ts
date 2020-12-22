import axios from 'axios';
import { bearer } from '../auth';
import { writeDataFile } from '../templates/data/data.template';

export async function getUserInfo() {
  bearer.initAuthToken$.subscribe({
    complete: () => {
      axios
        .get('https://api.spotify.com/v1/me')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}

export async function getUserTopSpotify(
  category: 'artists' | 'tracks',
  timeRange: 'long_term' | 'medium_term' | 'short_term',
  limit: number,
) {
  bearer.initAuthToken$.subscribe({
    complete: () => {
      axios
        .get(`https://api.spotify.com/v1/me/top/${category}?time_range=${timeRange}&limit=${limit}`)
        .then((res) => {
          console.log(res.data);
          writeDataFile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}
