import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

// Component
import { AppComponent } from './app.component';
import { QuickreferenceComponent } from './quickreference/quickreference.component';

// Service
import {AppService} from "./app.service";
import { QuickreferenceService } from "./quickreference/quickreference.service"

// Utilities


// Routingh
import { routing } from "./app.routing";
import { SoilmoistureComponent } from './soilmoisture/soilmoisture.component';
import {NgxGaugeModule} from "ngx-gauge";
import {SoilmoistureService} from "./soilmoisture/soilmoisture.service";



@NgModule({
  declarations: [
    AppComponent,
    QuickreferenceComponent,
    SoilmoistureComponent
  ],
  imports: [
    HttpClientModule,
    routing,
    BrowserModule,
    NgxGaugeModule
  ],
  providers: [
    AppService,
    QuickreferenceService,
    SoilmoistureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
