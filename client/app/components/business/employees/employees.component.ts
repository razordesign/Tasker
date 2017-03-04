import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../shared/models/Employee';
import { EmployeeService } from '../../../services/employee.service';
import { MaterialModule, MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html',
    providers: [MaterialModule]
})

export class EmployeesComponent {
    employees: Employee[];
    selectedEmployee: Employee;
    firstName: string;
    lastName: string;
    email: string;
    constructor(public dialog: MdDialog, public notificationBar: MdSnackBar, private router: Router, private employeeService: EmployeeService) { }
    errorMessage: string;
    getEmployees() {
        this.employeeService.getEmployees()
            .then(
            employees => this.employees = employees,
            error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        this.getEmployees();
    }

    onSelect(employee: Employee): void {
        this.selectedEmployee = employee;
    }

    model = {
        firstName: "",
        lastName: ""
    };

    addEmployee() {
        var newEmployee = {
            firstName: this.model.firstName,
            lastName: this.model.lastName
        };
        this.employeeService.addEmployee(newEmployee)
            .subscribe(employee => {
                this.employees.push(employee);
                this.model.firstName = '';
                this.model.lastName = '';
            });
    }

    response: any;
    updateEmployee(employee) {
        console.log(employee);
        this.employeeService.updateEmployee(employee).subscribe(res => {
            this.response = res
            console.log(this.response);
            this.notificationOpen("Employee updated successfuly", "");
            this.hideEdit();
        });
    }
    selectedOption: string;
    deleteEmployee(id) {
        //Dialog Function
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            height: '175px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
            if (this.selectedOption === "yes") {
                var employees = this.employees;
                this.employeeService.deleteEmployee(id).subscribe(data => {
                    if (data.n == 1) {
                        for (var i = 0; i < employees.length; i++) {
                            if (employees[i]._id == id) {
                                employees.splice(i, 1);
                            }
                        }
                    }
                });
            }

        });




    }

    hideEdit(): void {
        this.selectedEmployee = undefined;
    }
    //Extra features
    //Notifications Function   
    notificationOpen(message, action) {
        this.notificationBar.open(message, action, {
            duration: 2000,
        });
    }

}

@Component({
    moduleId: module.id,
    selector: 'app-confirm-dialog',
    templateUrl: 'confirmationDialog.html',
    providers: [MaterialModule]

})
export class ConfirmDialogComponent implements OnInit {
    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }
    ngOnInit() { }
}