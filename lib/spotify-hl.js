"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyHl = void 0;
const spotify_api_1 = require("./spotify-api");
const auth_action_1 = require("./action/auth.action");
async function spotifyHl() {
    auth_action_1.authAction$.subscribe({
        complete: () => {
            spotify_api_1.api.getUserInfo();
            spotify_api_1.api.getUserTopSpotify('tracks', 'long_term', 1);
        },
    });
}
exports.spotifyHl = spotifyHl;
