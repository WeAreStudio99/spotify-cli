// See spotify-api doc : https://developer.spotify.com/documentation/web-api/reference/object-model/#track-object-full
/* eslint-disable camelcase */

import { Album } from './album.model';
import { Artist } from './artist.model';
import { ExternalID } from './external-ID.model';
import { ExternalURL } from './external-URL.model';
import { Restriction } from './restriction.model';
import { TrackLink } from './track-link.model';

export interface Track {
  album: Album;
  artists: Artist[];
  name: string;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalID;
  external_urls: ExternalURL;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackLink;
  restrictions?: Restriction;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}
