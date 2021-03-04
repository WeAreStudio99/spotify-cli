/* eslint-disable camelcase */
import { ExternalURL } from './external-URL.model';
import { Followers } from './followers.model';
import { Images } from './images.model';

export interface Artist {
  popularity: number;
  type: 'artist';
  uri: string;
  external_urls: ExternalURL;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
}
