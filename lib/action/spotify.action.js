"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyAction = void 0;
const spotify_api_1 = require("../spotify-api");
async function spotifyAction() {
    spotify_api_1.api.getUserInfo();
    spotify_api_1.api.getUserTopSpotify('artists', 'short_term', 10);
}
exports.spotifyAction = spotifyAction;
