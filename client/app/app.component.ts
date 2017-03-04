import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { ServiceService } from './services/service.service';
import { AuthService } from './shared/security/auth.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmployeeService, ServiceService]
})

export class AppComponent {
  constructor(public authService: AuthService, public router: Router) {
    this.authService.checklogin();

  }
  logout() {
    this.authService.logout();
    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
    this.router.navigate([redirect]);
  }
}
