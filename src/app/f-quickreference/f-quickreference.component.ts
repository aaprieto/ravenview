import { Component, OnInit } from '@angular/core';
import {FQuickreferenceService} from "./f-quickreference.service";
import {Router} from "@angular/router";
import {Farmer} from "../models/farmer.model";

@Component({
  selector: 'app-f-quickreference',
  templateUrl: './f-quickreference.component.html',
  styleUrls: ['./f-quickreference.component.css']
})
export class FQuickreferenceComponent implements OnInit {

  constructor(  private router: Router,
                private fquickreference: FQuickreferenceService) { }
  arruser = [];
  firstname = "";
  lastname = "";
  arrlistpods = [];
  selectedpod = '';

 // user:Farmer[] = [];

  user_id = "";
  air_temperature_celsius = "";
  air_temperature_fahrenheit = "";
  humidity = "";
  last_transaction_datetime =  "";
  latitude = "";
  longitude = "";
  machine_number = "";
  serial_number = "";
  soil_moisture_level = "";
  soil_temperature_celsius = "";
  soil_temperature_fahrenheit = "";


  usertest = "";

  ngOnInit() {

    this.fquickreference.retrieve_users_by_id(localStorage.getItem('inp_userid'))
      .subscribe(
        data => {
          if(data.length == 1) {

                 this.firstname = data[0]['first_name'];
                 this.lastname  = data[0]['last_name'];

          }
        });
    this.fquickreference.retrieve_userpods_by_id(localStorage.getItem('inp_userid'))
      .subscribe(
        data2 => {
          if(data2.length > 0) {
            for (var x = 0; x < data2.length; x++) {
              var newObj = new Object();
              newObj["pod_id"] = data2[x]['pod_id'];
              newObj["description"] = data2[x]['description'];
              this.arrlistpods.push(newObj)
              if(x == 0){
                this.retrievepoddetails(data2[x]['pod_id']);
              }
            }
          }
        });


   /*   if(localStorage.getItem('inp_chosenpodid') == ""){
        this.retrievepoddetails('pod1')
      }else {
        this.retrievepoddetails(localStorage.getItem('inp_chosenpodid'));
      }*/

  }


  refreshDash(){
    this.retrievepoddetails(localStorage.getItem('inp_podid'));

  }

  logOut(){
    localStorage.setItem( 'inp_username','');
    localStorage.setItem( 'inp_podid','');
    localStorage.setItem( 'inp_viewhistory_type','');
    localStorage.setItem("machinenumber", '' );
    localStorage.setItem("pod_description", '');
    let link = ['/'];
    this.router.navigate(link);
  }

  retrievepoddetails(podid){

    localStorage.setItem('inp_chosenpodid',podid);
    // get description from array
    for (var x = 0; x < this.arrlistpods.length; x++) {
      if (podid == this.arrlistpods[x]["pod_id"]){
        this.selectedpod = this.arrlistpods[x]["description"]
        localStorage.setItem("pod_description", this.selectedpod);

      }
    }
    console.log(podid);
    localStorage.setItem('inp_podid',podid);
    this.fquickreference.retrieve_userpods_by_userid_and_podid(localStorage.getItem('inp_userid') + '&' + podid)
      .subscribe(
        data => {

          this.user_id                      = data[0]['user_id'];
          this.air_temperature_celsius      = data[0]['air_temperature_celcsius'];
          this.air_temperature_fahrenheit   = data[0]['air_temperature_fahrenheit'];
          this.humidity                     = data[0]['humidity'];
          this.last_transaction_datetime    = data[0]['last_transaction_datetime'];
          this.latitude                     = data[0]['latitude'];
          this.longitude                    = data[0]['longitude'] ;
          this.machine_number               = data[0]['machine_number'];
          this.serial_number                = data[0]['serial_number'];
          this.soil_moisture_level          = data[0]['soil_moisture_level'];
          this.soil_temperature_celsius     = data[0]['soil_temperature_celsius'];
          this.soil_temperature_fahrenheit  = data[0]['soil_temperature_fahrenheit'];
          //  This should be changed to a Model
          // Overwrite Date for new changes when refreshed and new retrieve

          localStorage.setItem("machinenumber", this.machine_number );

          var d_Date = new Date();

          d_Date.getMonth();         // 6
          d_Date.getDate();          // 31
          d_Date.getDay();           // 4
          d_Date.getHours();         // 0
          d_Date.getMinutes();       // 0
          d_Date.getSeconds();
          this.last_transaction_datetime = d_Date.getMonth() + "-" + d_Date.getDate() + "-" + d_Date.getFullYear() + "  " + d_Date.getHours() + ":" +  d_Date.getMinutes() +":"+d_Date.getSeconds();
        });

  }

  viewhistory(type){

    if (localStorage.getItem('inp_chosenpodid').length < 1){
      alert("Please select Pod");
      return;
    }
    console.log(type);
    localStorage.setItem( 'inp_viewhistory_type',type);
    if(type == "soil_moisture"){
      let link = ['/soilmoisture'];
      this.router.navigate(link);
    }
    if(type == "soil_temperature"){
      let link = ['/soiltemperature'];
      this.router.navigate(link);
    }
    if(type == "air_temperature"){
      let link = ['/airtemperature'];
      this.router.navigate(link);
    }

  }

}
