"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenRequest = exports.authorizationRequest = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const express_1 = tslib_1.__importDefault(require("express"));
const open_1 = tslib_1.__importDefault(require("open"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const rxjs_1 = require("rxjs");
const _1 = require(".");
const environment_1 = require("../environments/environment");
const RESPONSE_TYPE = 'code';
const CLIENT_ID = '0b558d11e0a74244b2b58e9de1c3efb1';
const PORT = 8085;
const SHOW_DIALOG = true;
const SCOPE = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
].join('%20');
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&&show_dialog=${SHOW_DIALOG}&redirect_uri=${REDIRECT_URI}`;
const app = express_1.default();
function authorizationRequest() {
    return new rxjs_1.Observable((observer) => {
        const main = async () => {
            app.listen(PORT, () => {
                console.log('Opening the Spotify Login in your browser...');
                open_1.default(URL);
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
            const code = req.query.code;
            if (code) {
                _1.keychain.saveDataInKeychain(code, 'code').subscribe({
                    complete: () => {
                        observer.complete();
                    },
                });
            }
            process.exit();
        });
        main();
    });
}
exports.authorizationRequest = authorizationRequest;
async function refreshAccessTokenRequest(accessToken) {
    console.log(accessToken);
    const body = {
        grant_type: 'authorization_code',
        code: accessToken,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: environment_1.environment.clientSecret,
    };
    const credentials = (await axios_1.default
        .post('https://accounts.spotify.com/api/token', querystring_1.default.stringify(body))
        .then((res) => {
        const cred = {
            refreshToken: res.data.refresh_token,
            accessToken: res.data.access_token,
        };
        return cred;
    })
        .catch((err) => {
        console.log(err);
    }));
    _1.keychain.saveDataInKeychain(credentials.accessToken, 'access_token').subscribe();
    _1.keychain.saveDataInKeychain(credentials.refreshToken, 'refresh_token').subscribe();
}
exports.refreshAccessTokenRequest = refreshAccessTokenRequest;
