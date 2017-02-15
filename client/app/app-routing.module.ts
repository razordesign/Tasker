import { NgModule }              from '@angular/core';
import {RouterModule, Routes, Route}  from '@angular/router';
import {AppComponent} from './app.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from "./shared/security/auth.guard";
import {AuthService} from "./shared/security/auth.service";

const fallbackRoute:Route = {
    path: '**',
    component: LoginComponent
};
const appRoutes: Routes = [
    { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: '', component: LoginComponent },
    fallbackRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class AppRoutingModule {}