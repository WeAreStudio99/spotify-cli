import axios from 'axios';
import { Observable } from 'rxjs';
import { keychain } from '.';
import { environment } from '../environments/environment';

export const initAuthToken$ = new Observable((observer) => {
  keychain.getTokenInKeychain('access_token').subscribe((token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      observer.complete();
    } else {
      observer.error();
    }
  });
});

export const initBasicAuthToken$ = new Observable((observer) => {
  keychain.getTokenInKeychain().subscribe((token) => {
    if (token) {
      const data = `${token}:${environment.clientSecret}`;
      const base64Basic = Buffer.from(data, 'base64');
      console.log(base64Basic);
      //   axios.defaults.headers.common.Authorization = `Basic ${base64Basic}`;
      axios.defaults.headers.common['Content-Type'] = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      observer.complete();
    } else {
      observer.error();
    }
  });
});
