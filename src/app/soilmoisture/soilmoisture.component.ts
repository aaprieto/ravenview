import {Component, OnInit, AfterContentInit, AfterViewInit, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import {SoilmoistureService} from "./soilmoisture.service";
import DateTimeFormat = Intl.DateTimeFormat;



@Component({
  selector: 'app-soilmoisture',
  templateUrl: './soilmoisture.component.html',
  styleUrls: ['./soilmoisture.component.css']
})
export class SoilmoistureComponent implements OnInit{


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
    {headerName: 'Soil Moisture Level', field: 'soil_moisture_level'}

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
  dataSource: Object;
  constructor(private router: Router,
              private soilmoisturelevel:SoilmoistureService) {
    this.dataSource = {
      chart: {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion",
      },
      // Chart Data
      "data": [{
        "label": "Venezuela",
        "value": "290",
        "transdatetime":"yes"
      }, {
        "label": "Saudi",
        "value": "260",
        "transdatetime":"yes"
      }, {
        "label": "Canada",
        "value": "180",
        "transdatetime":"yes"
      }, {
        "label": "Iran",
        "value": "140",
        "transdatetime":"yes"
      }, {
        "label": "Russia",
        "value": "115",
        "transdatetime":"yes"
      }, {
        "label": "UAE",
        "value": "100",
        "transdatetime":"yes"
      }, {
        "label": "US",
        "value": "30",
        "transdatetime":"yes"
      }, {
        "label": "China",
        "value": "30",
        "transdatetime":"yes"
      }]
    }; // end of this.dataSource
  }

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

      this.soilmoisturelevel.retrieveSoilMoistureHistory(this.inp_datefrom + '&' + this.inp_dateto+ '&' + localStorage.getItem('inp_userid') + '&' + localStorage.getItem('inp_podid'))
        .subscribe(
          data => {
            //console.log(data);

            this.rowData = data;



            // setup for charting
            //this.dataSource = data;

           /* var res = data.replace("trans_datetime", "label");
            console.log(res);
            var final = res.replace("soil_moisture_level", "value");
            console.log(final);
            this.dataSource = final;*/



            var json = JSON.parse(JSON.stringify(data).split('"trans_datetime":').join('"label":'));
             json = JSON.parse(JSON.stringify(json).split('"soil_moisture_level":').join('"value":'));
            console.log(JSON.stringify(json));


            this.dataSource = {
              chart: {
                "caption": "Soil Moisture Level",
               // "subCaption": "In MMbbl = One Million barrels",
                "xAxisName": "Date Time",
                "yAxisName": "Soil Moisture Level",
               // "numberSuffix": "K",
                "theme": "fusion",
              },
              // Chart Data
              "data":  json
            }; // end of this.dataSource

            //this.dataSource = json;

          });


    }

  }
  back(){
    let link = ['/fquickreference'];
    this.router.navigate(link);
  }

  chart(){


    console.log("arnold:"+this.inp_datefrom );
    console.log("aprieto:"+this.inp_dateto);

  }
}
