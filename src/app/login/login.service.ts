import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import { AppConst } from '../constants/app-const';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class LoginService {
  private url = "";
  private serverPath:string = AppConst.serverPath;
  constructor(private http: HttpClient) { }

  validatelogin(typeofevent) : Observable<any>  {

    this.url = '/api/validatelogin/'+ typeofevent;
    console.log(this.url);
    return this.http.get(this.url);

  }

  validatelogininsurance(typeofevent) : Observable<any>  {

    this.url = '/api/validatelogininsurance/'+ typeofevent;
    return this.http.get(this.url);

  }


  checkSession(){
    const url = this.serverPath+ '/user/checkSession';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return  this.http.get(url,  { headers: headers} )
  }

  sendCredential(username: string, password: string) {
    const url = this.serverPath+ '/raventoken';
    //const encodedCredentials = btoa(username + ':' + password);
    const encodedCredentials = btoa('j' + ':' + 'p');
    console.log(username + ':' + password);
    console.log(encodedCredentials);
    const basicHeader = 'Basic ' + encodedCredentials;
     console.log(url);
     console.log(basicHeader);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.http.get(url, {headers: headers})
  }


}
