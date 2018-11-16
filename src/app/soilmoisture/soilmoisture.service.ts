import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SoilmoistureService {

  private url = "";
  constructor(private http: HttpClient) { }

  retrieveSoilMoistureHistory(parms) : Observable<any>  {
    this.url = '/api/retrievesoilmoisturehistory/'+ parms;
    return this.http.get(this.url);

  }
}
