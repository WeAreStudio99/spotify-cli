import { Observable } from 'rxjs';
import { auth, keychain } from '../auth';

export const authAction$ = new Observable((subscriber) => {
  try {
    keychain.checkToken().subscribe(() => {
      auth.authorizationRequest().subscribe({
        complete: () => {
          keychain.getTokenInKeychain('code').subscribe((token) => {
            auth.refreshAccessTokenRequest(token);
            subscriber.complete();
          });
        },
      });
    });
  } catch (err) {
    subscriber.error(err);
  }
});
