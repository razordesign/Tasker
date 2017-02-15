import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
    constructor(private router: Router, private http: Http) {
        console.log('Login Service Initialized...');
    }
    redirectUrl: string;
    company_id: string;
    login(User) {
        console.log(User);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/login', JSON.stringify(User), { headers: headers })
            .map((res: any) => {
                if (res) {
                    if (res.status === 201) {
                        this.redirectUrl = res.headers._headers.get("location")[0];
                        this.company_id = res.headers._headers.get("uid")[0];
                        this.redirect();
                        return [{ status: res.status, json: res }]
                    }
                    else if (res.status === 200) {
                        return [{ status: res.status, json: res }]
                    }
                }
            })
            .catch((error: any) => {
                if (error.status === 500) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 400) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 406) {
                    return Observable.throw(new Error(error.status));
                }
            }
            );
    }
    private redirect(): void {
        this.router.navigate([this.redirectUrl]); //use the stored url here
    }
    private handleError(error: any) {
        console.log('Yup an error occurred', error);
        return Observable.throw(error.message || error);
    }
}