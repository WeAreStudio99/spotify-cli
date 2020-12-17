import axios from 'axios';
import { Observable } from 'rxjs';
import { keychain } from '.';

export const initBearerToken$ = new Observable((observer) => {
  keychain.getTokenInKeychain().subscribe((token) => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      observer.complete();
    } else {
      observer.error();
    }
  });
});
