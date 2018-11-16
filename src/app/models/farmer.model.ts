import DateTimeFormat = Intl.DateTimeFormat;
/**
 * Created by Arnold Aprieto on 11/5/2018.
 */
export class Farmer {
  public userid: string;
  public podid: string;
  public machinenumber: string;
  public serialnumber: string;
  public soilmoisturelevel: string;
  public airtemperaturecelsius: string;
  public airtemperaturefahrenheit: string;
  public soiltemperaturecelsius: string;
  public soiltemperaturefahrenheit: string;
  public humidity: string;
  public lasttransactiondatetime: DateTimeFormat;
  public description: string;
  public latitude: string;
  public longitude: string;

  constructor(_userid: string, _podid: string, _machinenumber: string, _serialnumber: string , _soilmoisturelevel: string,
              _airtemperaturecelsius: string, _airtemperaturefahrenheit: string, _soiltemperaturecelsius: string,
              _soiltemperaturefahrenheit: string, _humidity: string, _lasttransactiondatetime: DateTimeFormat,
              _description: string, _latitude: string, _longitude: string){

    this.userid = _userid;
    this.podid = _podid;
    this.machinenumber = _machinenumber;
    this.serialnumber = _serialnumber;
    this.soilmoisturelevel = _soilmoisturelevel;
    this.airtemperaturecelsius = _airtemperaturecelsius;
    this.airtemperaturefahrenheit = _airtemperaturefahrenheit;
    this.soiltemperaturecelsius = _soiltemperaturecelsius;
    this.soiltemperaturefahrenheit = _soiltemperaturefahrenheit;
    this.humidity = _humidity;
    this.lasttransactiondatetime = _lasttransactiondatetime;
    this.description = _description;
    this.latitude = _latitude;
    this.longitude  = _longitude;

  }

}
