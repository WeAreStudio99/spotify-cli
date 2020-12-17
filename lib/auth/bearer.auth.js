"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBearerToken$ = exports.initAuthorization = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const _1 = require(".");
const initAuthorization = async () => {
    _1.keychain.getTokenInKeychain().subscribe((token) => {
        console.log(token);
        if (token) {
            axios_1.default.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        else {
            console.log('fail (TO TEMPLATE)');
        }
    });
};
exports.initAuthorization = initAuthorization;
exports.initBearerToken$ = new rxjs_1.Observable((observer) => {
    _1.keychain.getTokenInKeychain().subscribe((token) => {
        if (token) {
            axios_1.default.defaults.headers.common.Authorization = `Bearer ${token}`;
            observer.complete();
        }
        else {
            observer.error();
        }
    });
});
