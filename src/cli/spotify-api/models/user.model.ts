import { ExplicitContent } from './explicit-content.model';
import { ExternalURL } from './external-URL.model';
import { Followers } from './followers.model';
import { Images } from './images.model';

/* eslint-disable camelcase */
export interface IUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalURL;
  followers: Followers;
  href: string;
  id: string;
  images: Images[];
  product: 'free' | 'premium' | 'open';
  type: 'user';
  uri: string;
}
