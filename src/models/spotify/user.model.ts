import { IExplicitContent } from './explicit-content.model';
import { IExternalURL } from './external-URL.model';
import { IFollowers } from './followers.model';
import { IImage } from './images.model';

/* eslint-disable camelcase */
export interface IUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: IExplicitContent;
  external_urls: IExternalURL;
  followers: IFollowers;
  href: string;
  id: string;
  images: IImage[];
  product: 'free' | 'premium' | 'open';
  type: 'user';
  uri: string;
}
