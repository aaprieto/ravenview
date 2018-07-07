import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LoginService {
  private url = "";
  constructor(private http: HttpClient) { }

  validatelogin(typeofevent) : Observable<any>  {

    this.url = '/api/validatelogin/'+ typeofevent;
    return this.http.get(this.url);

  }



}
