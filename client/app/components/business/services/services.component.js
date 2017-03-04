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
var router_1 = require("@angular/router");
var service_service_1 = require("../../../services/service.service");
var material_1 = require("@angular/material");
var ServicesComponent = (function () {
    function ServicesComponent(dialog, notificationBar, router, serviceService) {
        this.dialog = dialog;
        this.notificationBar = notificationBar;
        this.router = router;
        this.serviceService = serviceService;
        this.model = {
            serviceName: this.serviceName,
            serviceDuration: this.serviceDuration
        };
        this.addingOff = 1;
    }
    ServicesComponent.prototype.getServices = function () {
        var _this = this;
        this.serviceService.getServices()
            .then(function (services) { return _this.services = services; }, function (error) { return _this.errorMessage = error; });
    };
    ServicesComponent.prototype.getAssignees = function (serviceId) {
        var _this = this;
        this.serviceService.getAssignees(serviceId)
            .then(function (assignees) { return _this.assignees = assignees; }, function (error) { return _this.errorMessage = error; });
    };
    ServicesComponent.prototype.unassign = function (serviceId, employeeId) {
        var _this = this;
        this.serviceService.unassign(serviceId, employeeId).subscribe(function (res) {
            _this.response = res;
            _this.getAssignees(serviceId);
        });
        /*    .then(
                assignees => this.assignees = assignees,
                error => this.errorMessage = <any>error);*/
    };
    ServicesComponent.prototype.assignEmployee = function (serviceId, employeeId) {
        var _this = this;
        this.serviceService.assign(serviceId, employeeId).subscribe(function (res) {
            _this.assignees.push(res);
        });
        this.addShower = undefined;
        this.addingOff = 1;
        //.then(assignees => this.assignees = assignees, error => this.errorMessage = <any>error);
    };
    ServicesComponent.prototype.ngOnInit = function () {
        this.getServices();
    };
    ServicesComponent.prototype.onSelect = function (service) {
        this.selectedService = service;
        this.getAssignees(this.selectedService._id);
        this.addShower = undefined;
        this.addingOff = 1;
    };
    ServicesComponent.prototype.addService = function () {
        var _this = this;
        var newService = {
            serviceName: this.model.serviceName,
            serviceDuration: this.model.serviceDuration
        };
        //Validate existence of ServiceName and ServiceDuration before sending
        if (newService.serviceName != "" && newService.serviceDuration > 0 && typeof newService.serviceName === 'string' && typeof newService.serviceDuration === 'number') {
            this.serviceService.addService(newService)
                .subscribe(function (service) {
                _this.services.push(service);
                _this.model.serviceName = '';
                _this.model.serviceDuration = 0;
            });
        }
    };
    ServicesComponent.prototype.updateService = function (service) {
        var _this = this;
        var validatedService = {
            serviceName: this.selectedService.serviceName,
            serviceDuration: this.selectedService.serviceDuration
        };
        if (validatedService.serviceName != "" && validatedService.serviceDuration > 0) {
            this.serviceService.updateService(service).subscribe(function (res) {
                _this.response = res;
                _this.notificationOpen("Service updated successfuly", "");
                _this.hideEdit();
            });
        }
    };
    ServicesComponent.prototype.deleteService = function (id) {
        var _this = this;
        //Dialog Function
        var dialogRef = this.dialog.open(ConfirmServiceComponent, {
            height: '175px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.selectedOption = result;
            if (_this.selectedOption === "yes") {
                var services = _this.services;
                _this.serviceService.deleteService(id).subscribe(function (data) {
                    if (data.n == 1) {
                        for (var i = 0; i < services.length; i++) {
                            if (services[i]._id == id) {
                                services.splice(i, 1);
                            }
                        }
                    }
                });
            }
        });
    };
    ServicesComponent.prototype.hideEdit = function () {
        this.selectedService = undefined;
    };
    //Extra features
    //Notifications Function   
    ServicesComponent.prototype.notificationOpen = function (message, action) {
        this.notificationBar.open(message, action, {
            duration: 2000,
        });
    };
    //Show adding assignee form and trigger employees load
    ServicesComponent.prototype.addShow = function (serviceId) {
        var _this = this;
        this.addShower = 1;
        this.addingOff = undefined;
        this.serviceService.getAvailableEmployees(serviceId).then(function (employees) { return _this.employees = employees; }, function (error) { return _this.errorMessage = error; });
        ;
    };
    return ServicesComponent;
}());
ServicesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'services',
        templateUrl: 'services.component.html',
        providers: [material_1.MaterialModule]
    }),
    __metadata("design:paramtypes", [material_1.MdDialog, material_1.MdSnackBar, router_1.Router, service_service_1.ServiceService])
], ServicesComponent);
exports.ServicesComponent = ServicesComponent;
var ConfirmServiceComponent = (function () {
    function ConfirmServiceComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ConfirmServiceComponent.prototype.ngOnInit = function () { };
    return ConfirmServiceComponent;
}());
ConfirmServiceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-confirm-dialog',
        templateUrl: 'confirmationDialog.html',
        providers: [material_1.MaterialModule]
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], ConfirmServiceComponent);
exports.ConfirmServiceComponent = ConfirmServiceComponent;
//# sourceMappingURL=services.component.js.map