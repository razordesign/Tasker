import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BusinessComponent } from './components/business/business.component';
import { BusinessModule } from './components/business/business.module';
//import { EmployeesComponent, ConfirmDialogComponent } from './components/employees/employees.component';
//import { ServicesComponent, ConfirmServiceComponent } from './components/services/services.component';
import { MdDialogModule, MaterialModule } from '@angular/material';
import { AuthGuard } from "./shared/security/auth.guard";

@NgModule({
 // entryComponents: [ ConfirmDialogComponent, ConfirmServiceComponent ],
  imports: [
    [MaterialModule],
    MdDialogModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    BusinessModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, LoginComponent
 // EmployeesComponent, ServicesComponent, ConfirmDialogComponent, ConfirmServiceComponent 
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
