import express from 'express';
import open from 'open';
import environment from '../../../environments/environment.prod';
import { SpotifyAuth } from '../models/spotify-auth.model';
import KeychainService from '../utils/keychain.service';

export default class AuthService {
  private readonly _keychainService = new KeychainService();

  private readonly _app = express();

  private readonly _port = 8085;

  private readonly _clientID = environment.spotifyClientID;

  private readonly _responseType = 'code';

  private readonly _scope = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
  ];

  private _redirectURI = `http://localhost:${this._port}/callback`;

  private _showDialog = true;

  private _spotifyAuthHeader: SpotifyAuth = {
    RESPONSE_TYPE: this._responseType,
    CLIENT_ID: this._clientID,
    PORT: this._port,
    SHOW_DIALOG: this._showDialog,
    SCOPE: this._scope.join('%20'),
    REDIRECT_URI: `http://localhost:${this._port}/callback`,
    URL: `https://accounts.spotify.com/authorize?client_id=${this._clientID}&response_type=${
      this._responseType
    }&scope=${this._scope.join('%20')}&&show_dialog=${this._showDialog}&redirect_uri=${
      this._redirectURI
    }`,
  };

  //   private _spotifyRefreshHeader: SpotifyAuth = {
  //     GRANT_TYPE: 'authorization_code',
  //     CODE: '',
  //     REDIRECT_URI: this._redirectURI,
  //     CLIENT_ID: this._clientID,
  //     // client_secret,
  //   };

  authorizationRequest = async () => {
    const main = async () => {
      try {
        this._app.listen(this._port, () => {
          if (this._spotifyAuthHeader.URL) {
            open(this._spotifyAuthHeader.URL);
          }
        });

        this._app.get('/callback', (req, res) => {
          res.sendFile(`${__dirname}/callback.html`);
          if (req.query.error) {
            console.log(req.query.error);
          }
        });

        this._app.get('/token', async (req, res) => {
          res.sendStatus(200);
          const code = req.query.code as string;

          if (code) {
            await this._keychainService.saveTokenInKeychain(code, 'code');
          }
        });
      } catch (err) {
        throw new Error(err);
      }
    };

    main();
  };
}
