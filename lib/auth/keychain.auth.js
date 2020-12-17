"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenInKeychain = exports.checkToken = exports.saveTokenInKeychain = void 0;
const tslib_1 = require("tslib");
const keytar_1 = tslib_1.__importDefault(require("keytar"));
const rxjs_1 = require("rxjs");
const service = 'spotify-hl';
const user = 'spotify-user';
function saveTokenInKeychain(token) {
    return new rxjs_1.Observable((observer) => {
        keytar_1.default
            .setPassword(service, user, token)
            .then(() => {
            observer.complete();
        })
            .catch((err) => {
            observer.error(err);
        });
    });
}
exports.saveTokenInKeychain = saveTokenInKeychain;
function checkToken() {
    return new rxjs_1.Observable((observer) => {
        keytar_1.default
            .getPassword(service, user)
            .then((token) => {
            if (token) {
                console.log(token);
                observer.next(true);
                observer.complete();
            }
            else {
                observer.next(false);
                observer.complete();
            }
        })
            .catch((err) => {
            observer.error(err);
        });
    });
}
exports.checkToken = checkToken;
function getTokenInKeychain() {
    return new rxjs_1.Observable((observer) => {
        keytar_1.default.getPassword(service, user).then((pwd) => {
            if (pwd) {
                observer.next(pwd);
            }
            else {
                observer.error();
            }
        });
    });
}
exports.getTokenInKeychain = getTokenInKeychain;
