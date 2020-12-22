"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAction$ = void 0;
const rxjs_1 = require("rxjs");
const auth_1 = require("../auth");
exports.authAction$ = new rxjs_1.Observable((subscriber) => {
    try {
        auth_1.keychain.checkToken().subscribe(() => {
            auth_1.auth.authorizationRequest().subscribe({
                complete: () => {
                    auth_1.keychain.getTokenInKeychain('code').subscribe((token) => {
                        auth_1.auth.refreshAccessTokenRequest(token);
                        subscriber.complete();
                    });
                },
            });
        });
    }
    catch (err) {
        subscriber.error(err);
    }
});
