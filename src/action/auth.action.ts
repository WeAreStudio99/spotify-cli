import { Observable } from 'rxjs';
import { auth, keychain } from '../auth';

export const authAction$ = new Observable((subscriber) => {
  try {
    keychain.checkToken().subscribe((tokenExist) => {
      if (tokenExist) {
        console.log('You are already logged in');
        subscriber.complete();
      } else {
        auth.spotifyAuth();
      }
    });
  } catch (err) {
    subscriber.error(err);
  }
});
