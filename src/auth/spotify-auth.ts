import express from 'express';
import open from 'open';
import { keychain } from '.';

const CLIENT_ID: string = '0b558d11e0a74244b2b58e9de1c3efb1';
const PORT: number = 8085;
const SHOW_DIALOG = false;
const SCOPE: string = ['user-read-private', 'user-read-email', 'user-read-recently-played', 'user-top-read'].join(
  '%20',
);

const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${SCOPE}&&show_dialog=${SHOW_DIALOG}&redirect_uri=${REDIRECT_URI}`;

const app = express();

export async function spotifyAuth() {
  app.get('/callback', (req, res) => {
    res.sendFile(`${__dirname}/callback.html`);
    if (req.query.error) {
      console.log(req.query.error);
    }
  });

  app.get('/token', (req, res) => {
    res.sendStatus(200);
    const token = req.query.access_token as string;
    if (token) {
      keychain.saveTokenInKeychain(token).subscribe();
    }
    process.exit();
  });

  const main = () => {
    app.listen(PORT, () => {
      console.log('Opening the Spotify Login in your browser...');
      open(URL);
    });
  };

  main();
}
