import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AppService {

  private url = "";
  constructor(private http: HttpClient) { }

  retrieveStatus(pod) : Observable<any>  {
    this.url = '/api/retrievestatus/'+ pod;
    return this.http.get(this.url);

  }
  retrieveTempHumid() : Observable<any>  {
    this.url = '/api/retrievetemperaturehumidity/';
    return this.http.get(this.url);
  }
}
