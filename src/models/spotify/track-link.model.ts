// See spotify-api doc : https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link
import { IExternalURL } from './external-URL.model';
/* eslint-disable camelcase */

export interface ITrackLink {
  external_urls: IExternalURL;
  href: string;
  id: string;
  type: string;
  uri: string;
}
