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
var employee_service_1 = require("../../services/employee.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService) {
        var _this = this;
        this.employeeService = employeeService;
        this.model = {
            firstName: "",
            lastName: "",
            companyID: ""
        };
        this.submitted = false;
        this.employeeService.getEmployees(989)
            .subscribe(function (employees) {
            _this.employees = employees;
        });
    }
    EmployeesComponent.prototype.onSubmit = function () {
        this.submitted = true;
    };
    EmployeesComponent.prototype.addEmployee = function () {
        var _this = this;
        var newEmployee = {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            companyID: this.model.companyID
        };
        this.employeeService.addEmployee(newEmployee)
            .subscribe(function (employee) {
            _this.employees.push(employee);
            _this.firstName = '';
            _this.lastName = '';
        });
    };
    EmployeesComponent.prototype.deleteEmployee = function (id) {
        var employees = this.employees;
        this.employeeService.deleteEmployee(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < employees.length; i++) {
                    if (employees[i]._id == id) {
                        employees.splice(i, 1);
                    }
                }
            }
        });
    };
    EmployeesComponent.prototype.updateStatus = function (employee) {
        var _employee = {
            _id: employee._id,
            title: employee.title,
            isDone: !employee.isDone
        };
        this.employeeService.updateStatus(_employee).subscribe(function (data) {
            employee.isDone = !employee.isDone;
        });
    };
    return EmployeesComponent;
}());
EmployeesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'employees',
        templateUrl: 'employees.component.html'
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeesComponent);
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map