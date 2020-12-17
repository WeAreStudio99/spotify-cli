"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTopSpotify = exports.getUserInfo = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const auth_1 = require("../auth");
async function getUserInfo() {
    auth_1.bearer.initBearerToken$.subscribe({
        complete: () => {
            axios_1.default
                .get('https://api.spotify.com/v1/me')
                .then((res) => {
                console.log(res.data);
            })
                .catch((err) => {
                console.log(err);
            });
        },
    });
}
exports.getUserInfo = getUserInfo;
async function getUserTopSpotify(category, timeRange, limit) {
    auth_1.bearer.initBearerToken$.subscribe({
        complete: () => {
            axios_1.default
                .get(`https://api.spotify.com/v1/me/top/${category}?time_range=${timeRange}&limit=${limit}`)
                .then((res) => {
                console.log(res.data);
            })
                .catch((err) => {
                console.log(err);
            });
        },
    });
}
exports.getUserTopSpotify = getUserTopSpotify;
