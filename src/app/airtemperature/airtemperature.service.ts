import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AirtemperatureService {

  private url = "";
  constructor(private http: HttpClient) { }

  retrieveAirtemperatureHistory(parms) : Observable<any>  {
    this.url = '/api/retrieveairtemperaturehistory/'+ parms;
    return this.http.get(this.url);

  }
}
