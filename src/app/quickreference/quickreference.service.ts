import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class QuickreferenceService {

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



  retrieveSoilMoistureStatus(pod) : Observable<any>  {
    this.url = '/api/retrievesoilmoisturelevel/'+ pod;
    return this.http.get(this.url);

  }

  retrieveAirTemperatureHumidity(pod) : Observable<any>  {
    this.url = '/api/retrieveairtemperaturehumidity/'+ pod;
    return this.http.get(this.url);

  }
  retrieveSoilTemperature(pod) : Observable<any>  {
    this.url = '/api/retrievesoiltemperature/'+ pod;
    return this.http.get(this.url);

  }


}
