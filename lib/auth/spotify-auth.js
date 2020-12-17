"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyAuth = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const open_1 = tslib_1.__importDefault(require("open"));
const _1 = require(".");
const CLIENT_ID = '0b558d11e0a74244b2b58e9de1c3efb1';
const PORT = 8085;
const SHOW_DIALOG = false;
const SCOPE = ['user-read-private', 'user-read-email', 'user-read-recently-played', 'user-top-read'].join('%20');
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${SCOPE}&&show_dialog=${SHOW_DIALOG}&redirect_uri=${REDIRECT_URI}`;
const app = express_1.default();
async function spotifyAuth() {
    app.get('/callback', (req, res) => {
        res.sendFile(`${__dirname}/callback.html`);
        if (req.query.error) {
            console.log(req.query.error);
        }
    });
    app.get('/token', (req, res) => {
        res.sendStatus(200);
        const token = req.query.access_token;
        if (token) {
            _1.keychain.saveTokenInKeychain(token).subscribe();
        }
        process.exit();
    });
    const main = () => {
        app.listen(PORT, () => {
            console.log('Opening the Spotify Login in your browser...');
            open_1.default(URL);
        });
    };
    main();
}
exports.spotifyAuth = spotifyAuth;
