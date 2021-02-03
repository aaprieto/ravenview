import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// Component
import { AppComponent } from './app.component';
import { QuickreferenceComponent } from './quickreference/quickreference.component';

// Service
import {AppService} from "./app.service";
import { QuickreferenceService } from "./quickreference/quickreference.service"
import {SoilmoistureService} from "./soilmoisture/soilmoisture.service";
import {LoginService} from "./login/login.service";
import {UserService} from "./services/user.service";
// Utilities


// Routing
import { routing } from "./app.routing";
import { SoilmoistureComponent } from './soilmoisture/soilmoisture.component';
import {NgxGaugeModule} from "ngx-gauge";
import { LoginComponent } from './login/login.component';
import { FQuickreferenceComponent } from './f-quickreference/f-quickreference.component';
import {FQuickreferenceService} from "./f-quickreference/f-quickreference.service";

//import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AgGridModule } from 'ag-grid-angular';
import { SoiltemperatureComponent } from './soiltemperature/soiltemperature.component';
import {SoiltemperatureService} from "./soiltemperature/soiltemperature.service";
import { AirtemperatureComponent } from './airtemperature/airtemperature.component';
import {AirtemperatureService} from "./airtemperature/airtemperature.service";
import { IUserlistComponent } from './i-userlist/i-userlist.component';
import {IUserlistService} from "./i-userlist/i-userlist.service";



// In app.module.ts
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
// Include Below Snippet
FusionChartsModule.fcRoot(FusionCharts, Column2D);


import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    QuickreferenceComponent,
    SoilmoistureComponent,
    LoginComponent,
    FQuickreferenceComponent,
    SoiltemperatureComponent,
    AirtemperatureComponent,
    IUserlistComponent
  ],
  imports: [
    HttpClientModule,
    routing,
    BrowserModule,
    NgxGaugeModule,
    BrowserModule,
    AngularDateTimePickerModule,
    AgGridModule.withComponents(null),
    FusionChartsModule,
    FormsModule
  ],
  providers: [
    AppService,
    QuickreferenceService,
    SoilmoistureService,
    LoginService,
    UserService,
    FQuickreferenceService,
    SoiltemperatureService,
    AirtemperatureService,
    IUserlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
