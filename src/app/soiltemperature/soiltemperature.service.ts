import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SoiltemperatureService {


  private url = "";
  constructor(private http: HttpClient) { }

  retrieveSoilTemperatureHistory(parms) : Observable<any>  {
    this.url = '/api/retrievesoiltemperaturehistory/'+ parms;
    return this.http.get(this.url);

  }

}
