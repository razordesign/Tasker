import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    constructor(private http:Http){
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    company_id: string;

    login(username,password): Observable<boolean> {
        let User = {
            "login": username,
            "password": password
        };
        console.log(User);
        //Test Content
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/login', JSON.stringify(User), { headers: headers })
            .map((res: any) => {
                if (res) {
                    if (res.status === 201) {
                        this.redirectUrl = res.headers._headers.get("location")[0];
                        this.company_id = res.headers._headers.get("uid")[0];
                        console.log(this.company_id);
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
        //Test Content

        //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}