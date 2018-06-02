import {Component, OnInit, AfterContentInit, AfterViewInit, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import { NgxGaugeModule } from 'ngx-gauge';
import {SoilmoistureService} from "./soilmoisture.service";
import {isLineBreak} from "codelyzer/angular/sourceMappingVisitor";
@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit, OnChanges{

  constructor(private router: Router,
              private soilmoisturelevel:SoilmoistureService) { }
  // Gauge Chart

  gaugeType = "full";
  gaugeValue= localStorage.getItem("pod_status_level_value");
  gaugeLabel = "Full";
  gaugeAppendText = "%";
  thickConfig = 20;
  sizeConfig = 200;



  thresholdConfig = {
    '0': {color: 'red'},
    '10': {color: 'green'},
    '90': {color: 'red'}
  };

  status ="... detecting";

  ngOnChanges(){
    console.log("DATA HAS BEEN CHANGED!")
  }
  ngOnInit() {
    console.log("from cookies: " + localStorage.getItem("pod_status_level_value"))
    /*let g = 0;
    this.soilmoisturelevel.retrieveSoilMoistureStatus("pod1")
      .subscribe(
        data => {

            this.test(data[0]["status"]);


        }
        */

  }

}
