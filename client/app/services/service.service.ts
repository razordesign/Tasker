import { Injectable } from '@angular/core';
import { Service } from '../shared/models/service';
import { Employee } from '../shared/models/employee';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceService {
    private serviceUrl = '/api/service';
    private assigneesUrl = '/api/assignees';
    constructor(private http: Http) { }

    getServices(): Promise<Service[]> {
        return this.http.get(this.serviceUrl+"s")
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

    getService(id: any): Promise<Service> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addService(newService) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/service', JSON.stringify(newService), { headers: headers })
            .map(res => res.json());
    }

    deleteService(id) {
        return this.http.delete(this.serviceUrl + "/" + id)
            .map(res => res.json());
    }

    updateService(service) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/service/', JSON.stringify(service), { headers: headers })
            .map(res => res.json());
    }

    getAssignees(serviceId: any) {
        const url = `${this.assigneesUrl}/${serviceId}`;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getAvailableEmployees(serviceId:any): Promise<Employee[]> {
        const url = `${this.assigneesUrl}/available/${serviceId}`;
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    assign(serviceId:any, employeeId:any){
        var item = {
            type: "assign",
            serviceId: serviceId,
            employeeId: employeeId
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/assignees/', JSON.stringify(item), { headers: headers })
            .map(res => res.json());
    }

    unassign(serviceId:any, employeeId:any){
        var item = {
            type: "unassign",
            serviceId: serviceId,
            employeeId: employeeId
        };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/assignees', JSON.stringify(item), { headers: headers })
            .map(res => res.json());
    }

}