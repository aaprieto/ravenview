import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  //i_uname:string ="";
  i_uname:string ="arnold.aprieto@gmail.com";
  //i_password:string ="";
  i_password:string ="password";
  error_description_login:string = "";
  loginFailed = false;
  private timer;
  private sub4: Subscription;
  usertype = "";
  arrlist = [{id: 'farmer',name: "Farmer"},{id: 'insurance',name: "Insurance"}];




  constructor(  private router: Router,
                private _loginservice: LoginService) { }

  ngOnInit() {
  }



  changeopt(event){
    this.usertype = event.target.value;
  }



  enterlogin(_uname, _pswd){

    if (_uname.length < 1){
      this.loginFailed = true;
      this.error_description_login = "Please enter UserName";
      this.timer = Observable.timer(3000);
      this.sub4 = this.timer.subscribe(t => this.failedLoginUserName());
      return;
    }
    if (_pswd.length < 1){
      this.loginFailed = true;
      this.error_description_login = "Please enter Password";
      this.timer = Observable.timer(3000);
      this.sub4 = this.timer.subscribe(t => this.failedLoginPassword());
      return;
    }


    // only works for 'farmer' for now. 'insurance' to follow later.
    if (this.usertype == 'farmer') {
      this._loginservice.validatelogin(_uname + "&" + _pswd)
        .subscribe(
          data => {
            if (data[0]["result"] == 'error') {
              this.loginFailed = true;
              this.error_description_login = data[0]["message"];
              this.timer = Observable.timer(3000);
              this.sub4 = this.timer.subscribe(t => this.failedLoginUserName());
              return;
            }
            if (data[0]["result"] == 'success') {
              localStorage.setItem('inp_userid', _uname);
              localStorage.setItem('inp_chosenpodid', '');
              let link = ['/fquickreference'];
              this.router.navigate(link);
            }
          });
    }


    if (this.usertype == 'insurance') {
      this._loginservice.validatelogininsurance(_uname + "&" + _pswd)
        .subscribe(
          data => {
            if (data[0]["result"] == 'error') {
              this.loginFailed = true;
              this.error_description_login = data[0]["message"];
              this.timer = Observable.timer(3000);
              this.sub4 = this.timer.subscribe(t => this.failedLoginUserName());
              return;
            }
            if (data[0]["result"] == 'success') {
              localStorage.setItem('inp_insuranceid', _uname);
              localStorage.setItem('inp_userid', '');
              localStorage.setItem('inp_chosenpodid', '');
              let link = ['/iuserlist'];
              this.router.navigate(link);
            }
          });
    }



  }
  failedLoginUserName(){

    this.loginFailed = false;
    localStorage.setItem('inp_username',"");  /* User name*/
    localStorage.setItem( 'inp_password',"");
    this.i_uname = null;
    this.i_password = null;
    document.getElementById("uname").focus();
    return;

  }
  failedLoginPassword(){

    this.loginFailed = false;
    this.i_password = "";
    localStorage.setItem( 'inp_password',"");
    document.getElementById("pass").focus();
    return;

  }
}
