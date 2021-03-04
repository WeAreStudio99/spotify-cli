import { Artist } from './artist.model';
import { Track } from './tracks.model';

export default interface Paging {
  href: string;
  items: Artist[] | Track[];
  limit: number;
  previous: string;
  next: string;
  offset: number;
  total: number;
}
