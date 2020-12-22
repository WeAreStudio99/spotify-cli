"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBasicAuthToken$ = exports.initAuthToken$ = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const _1 = require(".");
const environment_1 = require("../environments/environment");
exports.initAuthToken$ = new rxjs_1.Observable((observer) => {
    _1.keychain.getTokenInKeychain('access_token').subscribe((token) => {
        if (token) {
            axios_1.default.defaults.headers.common.Authorization = `Bearer ${token}`;
            observer.complete();
        }
        else {
            observer.error();
        }
    });
});
exports.initBasicAuthToken$ = new rxjs_1.Observable((observer) => {
    _1.keychain.getTokenInKeychain().subscribe((token) => {
        if (token) {
            const data = `${token}:${environment_1.environment.clientSecret}`;
            const base64Basic = Buffer.from(data, 'base64');
            console.log(base64Basic);
            axios_1.default.defaults.headers.common['Content-Type'] = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            observer.complete();
        }
        else {
            observer.error();
        }
    });
});
