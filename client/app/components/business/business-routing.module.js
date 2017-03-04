"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var employees_component_1 = require("./employees/employees.component");
var services_component_1 = require("./services/services.component");
var business_component_1 = require("./business.component");
var businessRoutes = [
    { path: 'business', component: business_component_1.BusinessComponent },
    { path: 'business/employees', component: employees_component_1.EmployeesComponent },
    { path: 'business/services', component: services_component_1.ServicesComponent }
];
var BusinessRoutingModule = (function () {
    function BusinessRoutingModule() {
    }
    return BusinessRoutingModule;
}());
BusinessRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(businessRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], BusinessRoutingModule);
exports.BusinessRoutingModule = BusinessRoutingModule;
//# sourceMappingURL=business-routing.module.js.map