import { IArtist } from './artist.model';
import { ITrack } from './tracks.model';

export interface IPaging {
  href: string;
  items: IArtist[] | ITrack[];
  limit: number;
  previous: string;
  next: string;
  offset: number;
  total: number;
}
