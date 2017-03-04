import { Injectable } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
    private employeeUrl = '/api/employee';
    constructor(private http: Http) { }

    getEmployees(): Promise<Employee[]> {
        return this.http.get('/api/employees')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    getEmployee(id: any): Promise<Employee> {
        const url = `${this.employeeUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addEmployee(newEmployee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/employee', JSON.stringify(newEmployee), { headers: headers })
            .map(res => res.json());
    }

    deleteEmployee(id) {
        return this.http.delete('/api/employee/' + id)
            .map(res => res.json());
    }

    updateEmployee(employee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(employee._id);
        return this.http.put('/api/employee/', JSON.stringify(employee), { headers: headers })
            .map(res => res.json());
    }
}