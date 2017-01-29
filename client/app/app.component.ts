import { Component } from '@angular/core';
import {EmployeeService} from './services/employee.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[EmployeeService]
})

export class AppComponent { }
