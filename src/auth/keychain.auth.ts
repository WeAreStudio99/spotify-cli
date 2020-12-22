import keytar from 'keytar';
import { Observable } from 'rxjs';

const service: string = 'spotify-hl';
const user: string = 'spotify-user';

export function saveDataInKeychain(
  token: string,
  userName = user,
  serviceName = service,
): Observable<any> {
  return new Observable((observer) => {
    keytar
      .setPassword(serviceName, userName, token)
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

export function getTokenInKeychain(userName = user, serviceName = service): Observable<any> {
  return new Observable((observer) => {
    keytar
      .getPassword(serviceName, userName)
      .then((pwd) => {
        observer.next(pwd);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}
