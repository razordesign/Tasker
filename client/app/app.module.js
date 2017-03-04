"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var business_module_1 = require("./components/business/business.module");
//import { EmployeesComponent, ConfirmDialogComponent } from './components/employees/employees.component';
//import { ServicesComponent, ConfirmServiceComponent } from './components/services/services.component';
var material_1 = require("@angular/material");
var auth_guard_1 = require("./shared/security/auth.guard");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        // entryComponents: [ ConfirmDialogComponent, ConfirmServiceComponent ],
        imports: [
            [material_1.MaterialModule],
            material_1.MdDialogModule,
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            business_module_1.BusinessModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent
        ],
        providers: [auth_guard_1.AuthGuard],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map