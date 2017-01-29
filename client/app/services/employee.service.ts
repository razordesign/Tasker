import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService{
    constructor(private http:Http){
        console.log('Employee Service Initialized...');
            

    }
    getEmployees(companyID){
        return this.http.get('/api/employees/'+ companyID)
            .map(res => res.json());
    }
    
    addEmployee(newEmployee){
        console.log(newEmployee);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/employee', JSON.stringify(newEmployee), {headers: headers})
            .map(res => res.json());
    }
    
    deleteEmployee(id){
        return this.http.delete('/api/employee/'+id)
            .map(res => res.json());
    }
    
    updateStatus(employee){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/employee/'+employee._id, JSON.stringify(employee), {headers: headers})
            .map(res => res.json());
    }
}