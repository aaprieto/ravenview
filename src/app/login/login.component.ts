import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {UserService} from '../services/user.service';
import {User} from '../models/ravenuser.model';


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
  i_password:string ="sapphire";
  error_description_login:string = "";
  loginFailed = false;
  private timer;
  private sub4: Subscription;
  usertype = "";
  public loginError = false;
  private loggedIn = false;
  arrlist = [{id: 'farmer',name: "Farmer"},];
  public user: User  = new User();
  //arrlist = [{id: 'farmer',name: "Farmer"},{id: 'insurance',name: "Insurance"}];
  private dataFetched = false;



  constructor(  private router: Router,
                private _loginservice: LoginService,
                private _userService: UserService) { }

  ngOnInit() {


    this._loginservice.checkSession().subscribe(
      res => {

        this.getNewCurrentUser();
      },
      err => {

        this._loginservice.sendCredential('j', 'p').subscribe(
          res => {
            //console.log("Token return:" +  res['token']);
            localStorage.setItem('xAuthToken', res['token']);
            localStorage.setItem('user', 'j');
            this.loggedIn = false;
            this.router.navigate(['/'])
              .then(() => {this.loggedIn = false;

                 this.getNewCurrentUser();
                // location.reload();
              });
          }
        );



      }
    )

  }


  getNewCurrentUser(){
    localStorage.setItem('user', 'j');


    this._userService.getNewCurrentUser(localStorage.getItem('user')).subscribe(
      res => {
        //console.log(res);
        this.user = JSON.parse(JSON.stringify(res));

        console.log(this.user.email);
        if(this.user.email == 'initial_@gmail.com'){   // this is for temporary
          this.loggedIn = false;
          this.router.navigate(['/'])
        } else {
          alert("this should go to fquickreference");
          this.loggedIn = true;
          this.dataFetched = true;
          this.router.navigate(['/fquickreference'])

        }
      },
      err => {
        console.log(err);
      }
    );
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




    console.log(_uname, _pswd);

    if (this.usertype == 'farmer') {
      this._loginservice.sendCredential(_uname, _pswd).subscribe(
        res => {
             console.log("return send credential");
             console.log(res);
          localStorage.setItem('xAuthToken', res['token']);
          localStorage.setItem('user', _uname);
          //this.loggedIn = true;
          // this.router.navigate(['/'])
          //   .then(() => {
          //     location.reload();
          //   });

        },
        error => {
          console.log("error");
          // this.loggedIn = false;
          // this.loginError = true;
          // this.spinner.hide();

        }
      );
    }


    // only works for 'farmer' for now. 'insurance' to follow later.
    // if (this.usertype == 'farmer') {
    //          this._loginservice.validatelogin(_uname + "&" + _pswd)
    //          .subscribe(
    //       data => {
    //         if (data[0]["result"] == 'error') {
    //           this.loginFailed = true;
    //           this.error_description_login = data[0]["message"];
    //           this.timer = Observable.timer(3000);
    //           this.sub4 = this.timer.subscribe(t => this.failedLoginUserName());
    //           return;
    //         }
    //         if (data[0]["result"] == 'success') {
    //           localStorage.setItem('inp_userid', _uname);
    //           localStorage.setItem('inp_chosenpodid', '');
    //           let link = ['/fquickreference'];
    //           this.router.navigate(link);
    //         }
    //       });
    // }
    //
    //
    // if (this.usertype == 'insurance') {
    //   this._loginservice.validatelogininsurance(_uname + "&" + _pswd)
    //     .subscribe(
    //       data => {
    //         if (data[0]["result"] == 'error') {
    //           this.loginFailed = true;
    //           this.error_description_login = data[0]["message"];
    //           this.timer = Observable.timer(3000);
    //           this.sub4 = this.timer.subscribe(t => this.failedLoginUserName());
    //           return;
    //         }
    //         if (data[0]["result"] == 'success') {
    //           localStorage.setItem('inp_insuranceid', _uname);
    //           localStorage.setItem('inp_userid', '');
    //           localStorage.setItem('inp_chosenpodid', '');
    //           let link = ['/iuserlist'];
    //           this.router.navigate(link);
    //         }
    //       });
    // }



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
