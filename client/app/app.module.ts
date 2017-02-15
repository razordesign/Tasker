import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {LoginComponent} from './components/login/login.component';
import { MaterialModule } from '@angular/material';
import {AuthGuard} from "./shared/security/auth.guard";

@NgModule({
  imports:[ 
    [MaterialModule.forRoot()],
    BrowserModule, 
    HttpModule, 
    FormsModule,
    AppRoutingModule 
    ],
  declarations: [AppComponent, EmployeesComponent, LoginComponent],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
