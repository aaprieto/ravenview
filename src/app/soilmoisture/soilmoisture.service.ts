import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class SoilmoistureService {

  private url = "";
  constructor(private http: HttpClient) { }

  retrieveSoilMoistureStatus(pod) : Observable<any>  {
    this.url = '/api/retrievesoilmoisturelevel/'+ pod;
    return this.http.get(this.url);

  }
}
