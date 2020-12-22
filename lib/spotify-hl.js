"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyHl = void 0;
const auth_action_1 = require("./action/auth.action");
const spotify_action_1 = require("./action/spotify.action");
async function spotifyHl() {
    auth_action_1.authAction$.subscribe({
        complete: () => {
            spotify_action_1.spotifyAction();
        },
    });
}
exports.spotifyHl = spotifyHl;
