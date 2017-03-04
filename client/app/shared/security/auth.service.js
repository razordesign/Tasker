"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var User = {
            "login": username,
            "password": password
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/login', JSON.stringify(User), { headers: headers })
            .map(function (res) {
            if (res) {
                if (res.status === 201) {
                    _this.redirectUrl = "/employees";
                    _this.email = res.headers._headers.get("email")[0];
                    _this.isLoggedIn = true;
                    return [{ status: res.status, json: res }];
                }
                else if (res.status === 200) {
                    _this.isLoggedIn = false;
                    return [{ status: res.status, json: res }];
                }
            }
        })
            .catch(function (error) {
            if (error.status === 500) {
                return Observable_1.Observable.throw(new Error(error.status));
            }
            else if (error.status === 400) {
                return Observable_1.Observable.throw(new Error(error.status));
            }
            else if (error.status === 409) {
                return Observable_1.Observable.throw(new Error(error.status));
            }
            else if (error.status === 406) {
                return Observable_1.Observable.throw(new Error(error.status));
            }
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.http.get('/users/logout/')
            .map(function (res) {
            if (res) {
                if (res.status === 201) {
                    console.log(res.headers._headers.get("success")[0]);
                    _this.isLoggedIn = false;
                }
                else {
                    console.log(res.headers._headers.get("error")[0]);
                    _this.isLoggedIn = false;
                }
            }
        }).subscribe(function (res) { return _this.responser = res; });
        this.redirectUrl = "/";
    };
    AuthService.prototype.checklogin = function () {
        var _this = this;
        this.http.get('/users/checkstatus/')
            .map(function (res) {
            if (res) {
                if (res.status === 201) {
                    _this.email = res.headers._headers.get("email")[0];
                    _this.isLoggedIn = true;
                }
            }
        }).subscribe(function (res) { return _this.responser = res; });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map