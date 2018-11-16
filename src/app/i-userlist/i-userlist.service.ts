import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class IUserlistService {

  private url = "";
  constructor(private http: HttpClient) { }

  retrieve_insurance_by_id(userid) : Observable<any>  {

    this.url = '/api/retrieveinsurancebyid/'+ userid;
    return this.http.get(this.url);

  }
  retrieve_users_by_insuranceid(userid) : Observable<any>  {

    this.url = '/api/retrieveusersbyinsuranceid/'+ userid;
    return this.http.get(this.url);

  }




}
