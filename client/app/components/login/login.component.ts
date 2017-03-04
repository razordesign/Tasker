import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/security/auth.service';
import { User } from '../../shared/models/User';
import {MdSnackBar} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    message: string;
    constructor(public notificationBar: MdSnackBar, public authService: AuthService, public router: Router) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged' + (this.authService.isLoggedIn ? 'in' : 'out');
    }
    logme(username, password) {
        this.message = 'Trying to log in...';
        this.authService.login(username, password).subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/employees';
                // Redirect the user
                this.router.navigate([redirect]);
            }
            else{
                this.notificationOpen("Username/password combination not found", "")
            }
        });
    }

    notificationOpen(message, action) {
        this.notificationBar.open(message, action, {
            duration: 2000,
        });
    }
}
