import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    constructor(private http: Http) {
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    company_id: string;
    email: string;

    login(username, password): Observable<boolean> {
        let User = {
            "login": username,
            "password": password
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/login', JSON.stringify(User), { headers: headers })
            .map((res: any) => {
                if (res) {
                    if (res.status === 201) {
                        this.redirectUrl = "/employees";
                        this.email = res.headers._headers.get("email")[0];
                        this.isLoggedIn = true;

                        return [{ status: res.status, json: res }]
                    }
                    else if (res.status === 200) {
                        this.isLoggedIn = false;
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

    logout(): void {
        this.http.get('/users/logout/')
            .map((res: any) => {
                if (res) {
                    if (res.status === 201) {
                        console.log(res.headers._headers.get("success")[0])
                        this.isLoggedIn = false;
                    }
                    else {
                        console.log(res.headers._headers.get("error")[0])
                        this.isLoggedIn = false;
                    }
                }
            }).subscribe(res => this.responser = res);
        this.redirectUrl = "/";
    }

    responser: any;
    checklogin() {
        this.http.get('/users/checkstatus/')
            .map((res: any) => {
                if (res) {
                    if (res.status === 201) {
                        this.email = res.headers._headers.get("email")[0];
                        this.isLoggedIn = true;
                    }
                }
            }).subscribe(res => this.responser = res);
    }
}

