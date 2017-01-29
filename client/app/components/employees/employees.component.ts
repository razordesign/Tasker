import { Component } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../../Employee';

@Component({
  moduleId: module.id,
  selector: 'employees',
  templateUrl: 'employees.component.html'
})

export class EmployeesComponent { 
    employees: Employee[];
    firstName: string;
    lastName: string;
    companyID: string;
    constructor(private employeeService:EmployeeService){
        this.employeeService.getEmployees(989)
            .subscribe(employees => {
                this.employees = employees;
            });
    }
model = {
            firstName: "",
            lastName: "",
            companyID: ""
        };
submitted = false;
onSubmit() {
    this.submitted = true; 
}

    addEmployee(){
        var newEmployee = {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            companyID: this.model.companyID
        }
        this.employeeService.addEmployee(newEmployee)
            .subscribe(employee => {
                this.employees.push(employee);
                this.firstName = '';
                this.lastName = '';
            });
    }
    
    deleteEmployee(id){
        var employees = this.employees;
        
        this.employeeService.deleteEmployee(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < employees.length;i++){
                    if(employees[i]._id == id){
                        employees.splice(i, 1);
                    }
                }
            }
        });
    }
    
    updateStatus(employee){
        var _employee = {
            _id:employee._id,
            title: employee.title,
            isDone: !employee.isDone
        };
        
        this.employeeService.updateStatus(_employee).subscribe(data => {
            employee.isDone = !employee.isDone;
        });
    }
}
