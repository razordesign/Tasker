import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/security/auth.service';
import {User} from '../../../User';
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
    message: string;

    constructor(public authService: AuthService, public router: Router){
        this.setMessage();
    }

    setMessage(){
        this.message = 'Logged' + (this.authService.isLoggedIn? 'in': 'out');
    }

     logme(username, password){
        this.message = 'Trying to log in...';
        this.authService.login(username,password).subscribe(()=>{
            this.setMessage();
            if (this.authService.isLoggedIn){
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/employees';
                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
        }

        logout() {
            this.authService.logout();
            this.setMessage();
        }
    /*this.UserService.login(User)
                .subscribe(
                    
                );*/

}
