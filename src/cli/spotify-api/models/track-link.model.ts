// See spotify-api doc : https://developer.spotify.com/documentation/web-api/reference/object-model/#track-link
import { ExternalURL } from './external-URL.model';
/* eslint-disable camelcase */

export interface TrackLink {
  external_urls: ExternalURL;
  href: string;
  id: string;
  type: string;
  uri: string;
}
