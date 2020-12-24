// See spotify-api doc : https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full
/* eslint-disable camelcase */

import { IAlbum } from './album.model';
import { IArtist } from './artist.model';
import { IExternalID } from './external-ID.model';
import { IExternalURL } from './external-URL.model';
import { IRestriction } from './restriction.model';
import { ITrackLink } from './track-link.model';

export interface ITrack {
  album: IAlbum;
  artists: IArtist[];
  name: string;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: IExternalID;
  external_urls: IExternalURL;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: ITrackLink;
  restrictions?: IRestriction;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}
