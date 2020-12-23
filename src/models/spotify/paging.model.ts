import { IArtist } from './artist.model';
import { ITracks } from './tracks.model';

export interface IPaging {
  href: string;
  items: IArtist[] | ITracks[];
  limit: number;
  previous: string;
  next: string;
  offset: number;
  total: number;
}
