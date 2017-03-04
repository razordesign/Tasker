import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../shared/models/Service';
import { Employee } from '../../../shared/models/Employee';
import { ServiceService } from '../../../services/service.service';
import { MaterialModule, MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'services',
    templateUrl: 'services.component.html',
    providers: [MaterialModule]
})

export class ServicesComponent {
    services: Service[];
    employees: Employee[];
    assignees: Employee[];
    selectedService: Service;
    serviceName: string;
    serviceDuration: number;
    addShower: number;
    addingOff: number;

    constructor(public dialog: MdDialog, public notificationBar: MdSnackBar, private router: Router, private serviceService: ServiceService) {this.addingOff = 1;}

    errorMessage: string;
    
    getServices() {
        this.serviceService.getServices()
            .then(
            services => this.services = services,
            error => this.errorMessage = <any>error);
    }

    getAssignees(serviceId){
        this.serviceService.getAssignees(serviceId)
        .then(
            assignees => this.assignees = assignees,
            error => this.errorMessage = <any>error);
    }

    unassign(serviceId, employeeId){
        this.serviceService.unassign(serviceId, employeeId).subscribe(
            res => {
                this.response = res;
                this.getAssignees(serviceId);
        }
        );

    /*    .then(
            assignees => this.assignees = assignees,
            error => this.errorMessage = <any>error);*/
    }

    assignEmployee(serviceId, employeeId){
        this.serviceService.assign(serviceId, employeeId).subscribe(
           res=> {
               this.assignees.push(res);
           }
           );
           this.addShower = undefined;
           this.addingOff = 1;
        //.then(assignees => this.assignees = assignees, error => this.errorMessage = <any>error);
    }


    ngOnInit(): void {
        this.getServices();
    }

    onSelect(service: Service): void {
        this.selectedService = service;
        this.getAssignees(this.selectedService._id);
        this.addShower = undefined;
        this.addingOff = 1;
    }

    model = {
        serviceName: this.serviceName,
        serviceDuration: this.serviceDuration
    };

    addService() {
        var newService = {
            serviceName: this.model.serviceName,
            serviceDuration: this.model.serviceDuration
        };
        //Validate existence of ServiceName and ServiceDuration before sending
        if (newService.serviceName != "" && newService.serviceDuration > 0 && typeof newService.serviceName === 'string' && typeof newService.serviceDuration === 'number') {
            this.serviceService.addService(newService)
                .subscribe(service => {
                    this.services.push(service);
                    this.model.serviceName = '';
                    this.model.serviceDuration = 0;
                });
        }
    }

    response: any;
    updateService(service) {
        var validatedService = {
            serviceName: this.selectedService.serviceName,
            serviceDuration: this.selectedService.serviceDuration
        };
        if (validatedService.serviceName != "" && validatedService.serviceDuration > 0) {
            this.serviceService.updateService(service).subscribe(res => {
                this.response = res
                this.notificationOpen("Service updated successfuly", "");
                this.hideEdit();
            });
        }
    }
    selectedOption: string;
    deleteService(id) {
        //Dialog Function
        let dialogRef = this.dialog.open(ConfirmServiceComponent, {
            height: '175px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
            if (this.selectedOption === "yes") {
                var services = this.services;
                this.serviceService.deleteService(id).subscribe(data => {
                    if (data.n == 1) {
                        for (var i = 0; i < services.length; i++) {
                            if (services[i]._id == id) {
                                services.splice(i, 1);
                            }
                        }
                    }
                });
            }

        });




    }

    hideEdit(): void {
        this.selectedService = undefined;
    }
    //Extra features
    //Notifications Function   
    notificationOpen(message, action) {
        this.notificationBar.open(message, action, {
            duration: 2000,
        });
    }
    //Show adding assignee form and trigger employees load
    addShow(serviceId){
        this.addShower = 1;
        this.addingOff = undefined;
        this.serviceService.getAvailableEmployees(serviceId).then(
            employees => this.employees = employees,
            error => this.errorMessage = <any>error);;
    }


}

@Component({
    moduleId: module.id,
    selector: 'app-confirm-dialog',
    templateUrl: 'confirmationDialog.html',
    providers: [MaterialModule]

})
export class ConfirmServiceComponent implements OnInit {
    constructor(public dialogRef: MdDialogRef<ConfirmServiceComponent>) { }
    ngOnInit() { }
}