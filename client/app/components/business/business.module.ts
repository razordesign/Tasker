import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BusinessComponent } from './business.component';
import { EmployeesComponent }    from './employees/employees.component';
import { ServicesComponent }  from './services/services.component';
import { EmployeeService } from '../../services/employee.service';
import { ServiceService } from '../../services/service.service';
import { BusinessRoutingModule } from './business-routing.module';
@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    BusinessRoutingModule
  ],
  declarations: [
    BusinessComponent,
    EmployeesComponent,
    ServicesComponent
  ],
  providers: [ EmployeeService, ServiceService ]
})
export class BusinessModule {}