"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAction$ = void 0;
const rxjs_1 = require("rxjs");
const auth_1 = require("../auth");
exports.authAction$ = new rxjs_1.Observable((subscriber) => {
    try {
        auth_1.keychain.checkToken().subscribe((tokenExist) => {
            if (tokenExist) {
                console.log('You are already logged in');
                subscriber.complete();
            }
            else {
                auth_1.auth.spotifyAuth();
            }
        });
    }
    catch (err) {
        subscriber.error(err);
    }
});
