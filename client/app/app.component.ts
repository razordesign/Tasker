import { Component } from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {UserService} from './services/user.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[EmployeeService, UserService]
})

export class AppComponent { }
