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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var ServiceService = (function () {
    function ServiceService(http) {
        this.http = http;
        this.serviceUrl = '/api/service';
        this.assigneesUrl = '/api/assignees';
    }
    ServiceService.prototype.getServices = function () {
        return this.http.get(this.serviceUrl + "s")
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ServiceService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ServiceService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ServiceService.prototype.getService = function (id) {
        var url = this.serviceUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ServiceService.prototype.addService = function (newService) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/service', JSON.stringify(newService), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ServiceService.prototype.deleteService = function (id) {
        return this.http.delete(this.serviceUrl + "/" + id)
            .map(function (res) { return res.json(); });
    };
    ServiceService.prototype.updateService = function (service) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/service/', JSON.stringify(service), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ServiceService.prototype.getAssignees = function (serviceId) {
        var url = this.assigneesUrl + "/" + serviceId;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ServiceService.prototype.getAvailableEmployees = function (serviceId) {
        var url = this.assigneesUrl + "/available/" + serviceId;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ServiceService.prototype.assign = function (serviceId, employeeId) {
        var item = {
            type: "assign",
            serviceId: serviceId,
            employeeId: employeeId
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/assignees/', JSON.stringify(item), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ServiceService.prototype.unassign = function (serviceId, employeeId) {
        var item = {
            type: "unassign",
            serviceId: serviceId,
            employeeId: employeeId
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/assignees', JSON.stringify(item), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return ServiceService;
}());
ServiceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map