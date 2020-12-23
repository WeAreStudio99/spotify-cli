import axios from 'axios';
import express from 'express';
import open from 'open';
import querystring from 'querystring';
import { Observable } from 'rxjs';
import { keychain } from '.';
import { environment } from '../environments/environment';

const RESPONSE_TYPE = 'code';
const CLIENT_ID: string = '0b558d11e0a74244b2b58e9de1c3efb1';
const PORT: number = 8085;
const SHOW_DIALOG = false;
const SCOPE: string = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
].join('%20');

const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&&show_dialog=${SHOW_DIALOG}&redirect_uri=${REDIRECT_URI}`;

const app = express();
// const server = app.listen(PORT);

export function authorizationRequest(): Observable<any> {
  return new Observable((observer) => {
    const main = async () => {
      app.listen(PORT, () => {
        console.log('Opening the Spotify Login in your browser...');
        open(URL);
      });
    };

    app.get('/callback', (req, res) => {
      res.sendFile(`${__dirname}/callback.html`);
      if (req.query.error) {
        console.log(req.query.error);
      }
    });

    app.get('/token', (req, res) => {
      res.sendStatus(200);
      const code = req.query.code as string;
      if (code) {
        keychain.saveDataInKeychain(code, 'code').subscribe({
          complete: () => {
            observer.complete();
          },
        });
      }
    });

    main();
  });
}

export async function refreshAccessTokenRequest(accessToken: string): Promise<void> {
  const body = {
    grant_type: 'authorization_code',
    code: accessToken,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: environment.clientSecret,
  };

  const credentials = (await axios
    .post('https://accounts.spotify.com/api/token', querystring.stringify(body))
    .then((res) => {
      const cred = {
        refreshToken: res.data.refresh_token as string,
        accessToken: res.data.access_token,
      };
      return cred;
    })
    .catch((err) => {
      console.log(err);
    })) as { refreshToken: string; accessToken: string };

  keychain.saveDataInKeychain(credentials.accessToken, 'access_token').subscribe();
  keychain.saveDataInKeychain(credentials.refreshToken, 'refresh_token').subscribe();
}
