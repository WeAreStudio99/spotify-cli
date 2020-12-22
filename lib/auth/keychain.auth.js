"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenInKeychain = exports.checkToken = exports.saveDataInKeychain = void 0;
const tslib_1 = require("tslib");
const keytar_1 = tslib_1.__importDefault(require("keytar"));
const rxjs_1 = require("rxjs");
const service = 'spotify-hl';
const user = 'spotify-user';
function saveDataInKeychain(token, userName = user, serviceName = service) {
    return new rxjs_1.Observable((observer) => {
        keytar_1.default
            .setPassword(serviceName, userName, token)
            .then(() => {
            observer.complete();
        })
            .catch((err) => {
            observer.error(err);
        });
    });
}
exports.saveDataInKeychain = saveDataInKeychain;
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
function getTokenInKeychain(userName = user, serviceName = service) {
    return new rxjs_1.Observable((observer) => {
        keytar_1.default
            .getPassword(serviceName, userName)
            .then((pwd) => {
            observer.next(pwd);
            observer.complete();
        })
            .catch((err) => {
            observer.error(err);
        });
    });
}
exports.getTokenInKeychain = getTokenInKeychain;
