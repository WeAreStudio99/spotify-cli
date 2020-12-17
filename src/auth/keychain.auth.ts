import keytar from 'keytar';
import { Observable } from 'rxjs';

const service: string = 'spotify-hl';
const user: string = 'spotify-user';

export function saveTokenInKeychain(token: string): Observable<any> {
  return new Observable((observer) => {
    keytar
      .setPassword(service, user, token)
      .then(() => {
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}

export function checkToken(): Observable<boolean> {
  return new Observable((observer) => {
    keytar
      .getPassword(service, user)
      .then((token) => {
        if (token) {
          console.log(token);
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}

export function getTokenInKeychain(): Observable<any> {
  return new Observable((observer) => {
    keytar.getPassword(service, user).then((pwd) => {
      if (pwd) {
        observer.next(pwd);
      } else {
        observer.error();
      }
    });
  });
}
