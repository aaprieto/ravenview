import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AirtemperatureService} from "./airtemperature.service";
import DateTimeFormat = Intl.DateTimeFormat;
@Component({
  selector: 'app-airtemperature',
  templateUrl: './airtemperature.component.html',
  styleUrls: ['./airtemperature.component.css']
})
export class AirtemperatureComponent implements OnInit {

  columnDefs = [
    {headerName: 'Transaction Date', field: 'trans_datetime', cellFormatter: function(data) {

      var myDate = new Date(data.value);

      var inp_month = ((myDate.getMonth()) + 1);
      var inp_day = (myDate.getDate());
      var inp_year = (myDate.getFullYear());

      var inp_hours = (myDate.getHours());
      var inp_minutes = (myDate.getMinutes());
      var inp_seconds = (myDate.getSeconds());

      return inp_month+"-"+inp_day+"-"+inp_year+"  "+inp_hours+":"+inp_minutes+":"+inp_seconds;




    }},
    {headerName: 'Celsius', field: 'air_temperature_celsius'},
    {headerName: 'Fahrenheit', field: 'air_temperature_fahrenheit'},
    {headerName: 'Humidity', field: 'humidity'}

  ];

  rowData = [];




  date_from: Date = new Date();
  date_to: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'MMM-dd-yyyy HH:mm:ss',

    defaultOpen: false,
    closeOnSelect: true
  }


  inp_datefrom = "";
  inp_dateto = "";

  constructor(private router: Router,
              private _airtemperatureservice:AirtemperatureService) { }
  poddescription = "";
  podmachinenumber = "";
  ngOnInit() {
    // Set Datetime now.

    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
      + (currentdate.getMonth()+1)  + "-"
      + currentdate.getDate() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();


    this.inp_datefrom = datetime;
    this.inp_dateto = datetime;


    this.poddescription = localStorage.getItem( 'pod_description')
    this.podmachinenumber = localStorage.getItem( 'machinenumber');

    localStorage.getItem( 'inp_username');
    localStorage.getItem( 'inp_podid');
    localStorage.getItem( 'inp_viewhistory_type');
    localStorage.getItem( 'machinenumber');
    localStorage.getItem( 'pod_description');

  }
  onDateSelectFrom($event){

    var strDateTime = $event;
    var myDate = new Date(strDateTime);

    var inp_month = ((myDate.getMonth()) + 1);
    var inp_day = (myDate.getDate());
    var inp_year = (myDate.getFullYear());

    var inp_hours = (myDate.getHours());
    var inp_minutes = (myDate.getMinutes());
    var inp_seconds = (myDate.getSeconds());

    this.inp_datefrom = inp_year+"-"+inp_month+"-"+inp_day+" "+inp_hours+":"+inp_minutes+":"+inp_seconds;
    console.log(this.inp_datefrom);
  }

  onDateSelectTo($event){

    var strDateTime = $event;
    var myDate = new Date(strDateTime);

    var inp_month = ((myDate.getMonth()) + 1);
    var inp_day = (myDate.getDate());
    var inp_year = (myDate.getFullYear());

    var inp_hours = (myDate.getHours());
    var inp_minutes = (myDate.getMinutes());
    var inp_seconds = (myDate.getSeconds());

    this.inp_dateto = inp_year+"-"+inp_month+"-"+inp_day+" "+inp_hours+":"+inp_minutes+":"+inp_seconds;
    console.log(this.inp_dateto);
  }
  search(event){

    if(this.inp_datefrom > this.inp_dateto){
      alert("Error:  From is greater than to");
    } else {

      this._airtemperatureservice.retrieveAirtemperatureHistory(this.inp_datefrom + '&' + this.inp_dateto+ '&' + localStorage.getItem('inp_userid') + '&' + localStorage.getItem('inp_podid'))
        .subscribe(
          data => {
            console.log(data);
            this.rowData = data;
          });


    }

  }
  back(){
    let link = ['/fquickreference'];
    this.router.navigate(link);
  }
}
