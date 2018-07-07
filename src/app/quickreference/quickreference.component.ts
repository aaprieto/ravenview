import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {QuickreferenceService} from "./quickreference.service";
import {Router} from "@angular/router";
import { NgxGaugeModule } from 'ngx-gauge';
@Component({
  selector: 'app-quickreference',
  templateUrl: './quickreference.component.html',
  styleUrls: ['./quickreference.component.css']
})
export class QuickreferenceComponent implements OnInit {
  title = 'app';
  status ="... detecting";
  dateretrieved ="... detecting";
  celsius ="... detecting";
  fahrenheit ="... detecting";
  //humidity ="... detecting";

  podValue = "";
  podValueDescription = "";
  podSelectedValueDesc = "";


  soiltemp_fahrenheit = 0;
  soiltemp_celsius = 0;
  airtemp_fahrenheit = 0;
  airtemp_celsius = 0;
  humidity = 0;


  gaugeType = "full";
  gaugeValue= 0;
  gaugeLabel = "Full";
  gaugeAppendText = "%";
  thickConfig = 20;
  sizeConfig = 200;

  final_d_datetime = "";

  thresholdConfig = {
    '0': {color: 'red'},
    '10': {color: 'green'},
    '90': {color: 'red'}
  };




  private timer;
  sub2: Subscription;
  constructor(private appservice:QuickreferenceService,
              private router: Router) { }
  // quickreference should be the landing page.
  ngOnInit() {

    this.podValueDescription = "";
    this.podSelectedValueDesc = "";

    //this.selectPOD('pod1');
    //setInterval(()=> {this.runMainFunction()},5000);
    //setInterval(()=> {this.runTemperatureAndHumidity()},5000);

  }

  runMainFunction(){
    this.appservice.retrieveStatus(this.podValue)
      .subscribe(
        data => {

          this.status= data[0]["status"];
          if (this.status == ""){
            this.status = "... detecting";
          }
          console.log(this.status);
        }
      )

  }
  runTemperatureAndHumidity(){
    this.appservice.retrieveTempHumid()
      .subscribe(
        data => {
          console.log(data);

          this.dateretrieved = data[0]["tempdate"];
          this.celsius = data[1]["celsius"];
          this.fahrenheit =data[2]["fahrenheit"];
          this.humidity =data[3]["humidity"];

          if (this.dateretrieved == ""){
            this.dateretrieved = "... detecting";
          }
          if (this.celsius == ""){
            this.celsius = "... detecting";
          }
          if (this.fahrenheit == ""){
            this.fahrenheit = "... detecting";
          }
          //if (this.humidity == ""){
            //this.humidity = "... detecting";
          //}

        }
      )

  }
  refreshDash(){
    this.selectPOD(localStorage.getItem('pod'))
  }

  selectPOD(pod){

    localStorage.setItem('pod', pod);
    if (pod == "pod1"){
      this.podValue = pod;
      this.podValueDescription = "You are currently looking at POD 1";
      this.podSelectedValueDesc = "POD 1";

    }
    if (pod == "pod2"){
      this.podValue = pod;
      this.podValueDescription = "You are currently looking at POD 2";
      this.podSelectedValueDesc = "POD 2";
    }
    if (pod == "pod3"){
      this.podValue = pod;
      this.podValueDescription = "You are currently looking at POD 3";
      this.podSelectedValueDesc = "POD 3";
    }
    if (pod == "pod4"){
      this.podValue = pod;
      this.podValueDescription = "You are currently looking at POD 4";
      this.podSelectedValueDesc = "POD 4";
    }


    /* retrieve soil moisture sensor first then put in cookie so that
    it will not retrieve it anymore on the next page */

    this.appservice.retrieveSoilMoistureStatus(pod)
      .subscribe(
        data => {

          if ((data[0]["status"]) == "undefined"){
            data[0]["status"]  = 0;
          }
          localStorage.setItem("pod_number", pod);
          localStorage.setItem("pod_status_level_value" ,data[0]["status"]);
          this.gaugeValue= data[0]["status"];

        }
      )

    this.appservice.retrieveAirTemperatureHumidity(pod)
      .subscribe(
        data => {
          if ((data["retcelsius"]) == "undefined"){
            data["retcelsius"]  = 0;
          }
          if ((data["retfahrenheit"]) == "undefined"){
            data["retfahrenheit"]  = 0;
          }
          if ((data["rethumidity"]) == "undefined"){
            data["rethumidity"]  = 0;
          }

          this.airtemp_celsius = data["retcelsius"];
          this.airtemp_fahrenheit = data["retfahrenheit"];
          this.humidity = data["rethumidity"];
        }
      )

    this.appservice.retrieveSoilTemperature(pod)
      .subscribe(
        data => {
          if ((data["retcelsius"]) == "undefined"){
            data["retcelsius"]  = 0;
          }
          if ((data["retfahrenheit"]) == "undefined"){
            data["retfahrenheit"]  = 0;
          }


          this.soiltemp_celsius = data["retcelsius"];
          this.soiltemp_fahrenheit = data["retfahrenheit"];

        }
      )




   /* console.log(localStorage.getItem('pod'));
    let link = ['/quickreference/soilmoisture'];
    this.router.navigate(link);
*/




    //Retrieve from API EndPoint

    //setInterval(()=> {this.runMainFunction()},5000);
    //setInterval(()=> {this.runTemperatureAndHumidity()},5000);






    var d_Date = new Date();

    d_Date.getMonth();         // 6
    d_Date.getDate();          // 31
    d_Date.getDay();           // 4
    d_Date.getHours();         // 0
    d_Date.getMinutes();       // 0
    d_Date.getSeconds();

    this.final_d_datetime = d_Date.getMonth() + "-" + d_Date.getDate() + "-" + d_Date.getFullYear() + "  " + d_Date.getHours() + ":" +  d_Date.getMinutes() +":"+d_Date.getSeconds();


  }

  selectConf(arg:string){
    console.log(arg);
  }

  logOut(){
    localStorage.setItem( 'inp_username','');
    localStorage.setItem( 'inp_password','');
    let link = ['/'];
    this.router.navigate(link);
  }
}
