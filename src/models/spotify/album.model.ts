import { IArtist } from './artist.model';
import { IExternalURL } from './external-URL.model';
import { IImage } from './images.model';
import { IRestriction } from './restriction.model';

/* eslint-disable camelcase */
export interface IAlbum {
  album_group?: string;
  album_type: 'album' | 'single' | 'compilation';
  artists: IArtist[];
  available_markets: string[];
  external_urls: IExternalURL;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: IRestriction;
  type: string;
  uri: string;
}
