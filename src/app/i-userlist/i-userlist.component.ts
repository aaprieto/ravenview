import { Component, OnInit } from '@angular/core';
import {IUserlistService} from "./i-userlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-i-userlist',
  templateUrl: './i-userlist.component.html',
  styleUrls: ['./i-userlist.component.css']
})
export class IUserlistComponent implements OnInit {

  constructor(private iuserlistservice: IUserlistService,
              private router: Router,) { }

  insuranceid = "";
  insurancename = "";

  users = {};

  ngOnInit() {

    this.iuserlistservice.retrieve_insurance_by_id(localStorage.getItem('inp_insuranceid'))
      .subscribe(
        data => {
          if(data.length == 1) {

            this.insuranceid = data[0]['insurance_id'];
            this.insurancename  = data[0]['insurance_name'];

            this.iuserlistservice.retrieve_users_by_insuranceid(localStorage.getItem('inp_insuranceid'))
              .subscribe(
                data2 => {
                      console.log(data2);
                     this.users = data2;
                });


          }
        });

    /*
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
            }
          }
        });
*/



  }

  select(user_id){

    localStorage.setItem('inp_userid',user_id)
    localStorage.setItem('inp_chosenpodid', '');
    let link = ['/fquickreference'];
    this.router.navigate(link);
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
}
