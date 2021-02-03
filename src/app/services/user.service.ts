import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { AppConst } from '../constants/app-const';
import { User } from '../models/user';
import {Observable} from 'rxjs/Observable';

// @Injectable({
//   providedIn:'root'
// })


@Injectable()
 export class UserService {
   private url = "";
   private serverPath:string = AppConst.serverPath;
   constructor(private http: HttpClient) { }

  getNewCurrentUser(curUser:string){

    //const url = this.serverPath + '/user/getNewCurrentUser/' + curUser;
    const url = this.serverPath + '/user/getNewCurrentRavenUser/' + curUser;
    console.log(url);
    console.log(localStorage.getItem('xAuthToken'));
    const tokenHeader = new HttpHeaders({
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader, withCredentials: false })

  }


 }


//sudo kill $(sudo lsof -t -i:4200)

//export class UserService {
//  private serverPath:string = AppConst.serverPath;
//  constructor(private http: HttpClient) { }

    // getCurrentUser(){
    //     const url = this.serverPath + '/user/getCurrentUser';
    //     //console.log(url);
    //     const tokenHeader = new HttpHeaders({
    //         'Content-Type' : 'application/json',
    //         'x-auth-token': localStorage.getItem('xAuthToken')
    //     });
    //     return this.http.get(url, {headers: tokenHeader, withCredentials: false })
    // }


    // getNewCurrentUser(curUser:string){
    //
    //         // //const url = this.serverPath + '/user/getNewCurrentUser/' + curUser;
    //         // const url = this.serverPath + '/user/getNewCurrentRavenUser/' + curUser;
    //         // console.log(url);
    //         // console.log(localStorage.getItem('xAuthToken'));
    //         // const tokenHeader = new HttpHeaders({
    //         //     'Content-Type' : 'application/json',
    //         //     'x-auth-token': localStorage.getItem('xAuthToken')
    //         // });
    //         // return this.http.get(url, {headers: tokenHeader, withCredentials: false })
    //
    // }


  // getNewCurrentUser(curUser:string){

           // //const url = this.serverPath + '/user/getNewCurrentUser/' + curUser;
           // const url = this.serverPath + '/user/getNewCurrentRavenUser/' + curUser;
           // console.log(url);
           // console.log(localStorage.getItem('xAuthToken'));
           // const tokenHeader = new HttpHeaders({
           //     'Content-Type' : 'application/json',
           //     'x-auth-token': localStorage.getItem('xAuthToken')
           // });
           // return this.http.get(url, {headers: tokenHeader, withCredentials: false })

   //}

    // newUser(username: string, email: string, password: string, firstname: string, lastname:string)
    // {
    //     let url = this.serverPath+'/user/newUser';
    //     const userInfo = {
    //         "username": username,
    //         "email": email,
    //         "password": password,
    //         "firstname": firstname,
    //         "lastname": lastname,
    //
    //
    //     }
    //     const tokenHeader = new HttpHeaders({
    //         'Content-Type' : 'application/json',
    //         'x-auth-token': localStorage.getItem('xAuthToken')
    //     });
    //     return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader})
    // }

    // updateUserAccountDetails(user:User, firstName: string, lastName:string, email:string){
    //     let url = this.serverPath + "/user/updateUserAccountDetails";
    //     let userInfo = {
    //         "id": user.id,
    //         "firstName": firstName,
    //         "lastName": lastName,
    //         "username": email,
    //         "email": email,
    //
    //     }
    //
    //     const tokenHeader = new HttpHeaders({
    //         'Content-Type' : 'application/json',
    //         'x-auth-token': localStorage.getItem('xAuthToken')
    //     });
    //     return this.http.post(url, JSON.stringify(userInfo), {headers:tokenHeader})
    // }

    // updateUserPasswordChange(user:User, currentPassword: string, newPassword:string){
    //
    //     let url = this.serverPath + "/user/updateUserPasswordChange";
    //     let userInfo = {
    //         "id": user.id,
    //         "currentPassword": currentPassword,
    //         "newPassword": newPassword
    //     }
    //     const tokenHeader = new HttpHeaders({
    //         'Content-Type' : 'application/json',
    //         'x-auth-token': localStorage.getItem('xAuthToken')
    //     });
    //     return this.http.post(url, JSON.stringify(userInfo), {headers:tokenHeader})
    // }

//}
