/* eslint-disable camelcase */
import { IExternalURL } from './external-URL.model';
import { IFollowers } from './followers.model';
import { IImage } from './images.model';

export interface IArtist {
  popularity: number;
  type: 'artist';
  uri: string;
  external_urls: IExternalURL;
  followers: IFollowers;
  genres: string[];
  href: string;
  id: string;
  images: IImage[];
  name: string;
}
