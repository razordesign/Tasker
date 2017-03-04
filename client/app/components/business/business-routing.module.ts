import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent }    from './employees/employees.component';
import { ServicesComponent }  from './services/services.component';
import { BusinessComponent } from './business.component';
const businessRoutes: Routes = [
  { path: 'business',
    component: BusinessComponent,
    children: [
      {
         path: 'employees',  component: EmployeesComponent
      },
      {
        path: 'services', component: ServicesComponent
      }
    ]}
];
@NgModule({
  imports: [
    RouterModule.forChild(businessRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BusinessRoutingModule { }
