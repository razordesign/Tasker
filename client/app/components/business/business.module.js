"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var business_component_1 = require("./business.component");
var employees_component_1 = require("./employees/employees.component");
var services_component_1 = require("./services/services.component");
var employee_service_1 = require("../../services/employee.service");
var service_service_1 = require("../../services/service.service");
var business_routing_module_1 = require("./business-routing.module");
var BusinessModule = (function () {
    function BusinessModule() {
    }
    return BusinessModule;
}());
BusinessModule = __decorate([
    core_1.NgModule({
        imports: [
            material_1.MaterialModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            business_routing_module_1.BusinessRoutingModule
        ],
        declarations: [
            business_component_1.BusinessComponent,
            employees_component_1.EmployeesComponent,
            services_component_1.ServicesComponent
        ],
        providers: [employee_service_1.EmployeeService, service_service_1.ServiceService]
    })
], BusinessModule);
exports.BusinessModule = BusinessModule;
//# sourceMappingURL=business.module.js.map