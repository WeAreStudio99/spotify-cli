import { Artist } from './artist.model';
import { ExternalURL } from './external-URL.model';
import { Images } from './images.model';
import { Restriction } from './restriction.model';

/* eslint-disable camelcase */
export interface Album {
  album_group?: string;
  album_type: 'album' | 'single' | 'compilation';
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalURL;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restriction;
  type: string;
  uri: string;
}
