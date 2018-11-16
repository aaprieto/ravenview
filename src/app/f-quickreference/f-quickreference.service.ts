import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class FQuickreferenceService {
  private url = "";
  constructor(private http: HttpClient) { }

  retrieve_users_by_id(userid) : Observable<any>  {

    this.url = '/api/retrieveusersbyid/'+ userid;
    return this.http.get(this.url);

  }


  retrieve_userpods_by_id(userid) : Observable<any>  {

    this.url = '/api/retrieveuserpodsbyid/'+ userid;
    return this.http.get(this.url);

  }


  retrieve_userpods_by_userid_and_podid(_param) : Observable<any>  {

    this.url = '/api/retrieveuserpodsbyuseridpodid/'+ _param;
    return this.http.get(this.url);

  }

}



