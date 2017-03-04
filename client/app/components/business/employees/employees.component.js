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
var employee_service_1 = require("../../../services/employee.service");
var material_1 = require("@angular/material");
var EmployeesComponent = (function () {
    function EmployeesComponent(dialog, notificationBar, router, employeeService) {
        this.dialog = dialog;
        this.notificationBar = notificationBar;
        this.router = router;
        this.employeeService = employeeService;
        this.model = {
            firstName: "",
            lastName: ""
        };
    }
    EmployeesComponent.prototype.getEmployees = function () {
        var _this = this;
        this.employeeService.getEmployees()
            .then(function (employees) { return _this.employees = employees; }, function (error) { return _this.errorMessage = error; });
    };
    EmployeesComponent.prototype.ngOnInit = function () {
        this.getEmployees();
    };
    EmployeesComponent.prototype.onSelect = function (employee) {
        this.selectedEmployee = employee;
    };
    EmployeesComponent.prototype.addEmployee = function () {
        var _this = this;
        var newEmployee = {
            firstName: this.model.firstName,
            lastName: this.model.lastName
        };
        this.employeeService.addEmployee(newEmployee)
            .subscribe(function (employee) {
            _this.employees.push(employee);
            _this.model.firstName = '';
            _this.model.lastName = '';
        });
    };
    EmployeesComponent.prototype.updateEmployee = function (employee) {
        var _this = this;
        console.log(employee);
        this.employeeService.updateEmployee(employee).subscribe(function (res) {
            _this.response = res;
            console.log(_this.response);
            _this.notificationOpen("Employee updated successfuly", "");
            _this.hideEdit();
        });
    };
    EmployeesComponent.prototype.deleteEmployee = function (id) {
        var _this = this;
        //Dialog Function
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            height: '175px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.selectedOption = result;
            if (_this.selectedOption === "yes") {
                var employees = _this.employees;
                _this.employeeService.deleteEmployee(id).subscribe(function (data) {
                    if (data.n == 1) {
                        for (var i = 0; i < employees.length; i++) {
                            if (employees[i]._id == id) {
                                employees.splice(i, 1);
                            }
                        }
                    }
                });
            }
        });
    };
    EmployeesComponent.prototype.hideEdit = function () {
        this.selectedEmployee = undefined;
    };
    //Extra features
    //Notifications Function   
    EmployeesComponent.prototype.notificationOpen = function (message, action) {
        this.notificationBar.open(message, action, {
            duration: 2000,
        });
    };
    return EmployeesComponent;
}());
EmployeesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'employees',
        templateUrl: 'employees.component.html',
        providers: [material_1.MaterialModule]
    }),
    __metadata("design:paramtypes", [material_1.MdDialog, material_1.MdSnackBar, router_1.Router, employee_service_1.EmployeeService])
], EmployeesComponent);
exports.EmployeesComponent = EmployeesComponent;
var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ConfirmDialogComponent.prototype.ngOnInit = function () { };
    return ConfirmDialogComponent;
}());
ConfirmDialogComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-confirm-dialog',
        templateUrl: 'confirmationDialog.html',
        providers: [material_1.MaterialModule]
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], ConfirmDialogComponent);
exports.ConfirmDialogComponent = ConfirmDialogComponent;
//# sourceMappingURL=employees.component.js.map