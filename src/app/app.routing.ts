/**
 * Created by Arnold on 2018-04-21.
 */
import {Routes, RouterModule} from "@angular/router";
import {QuickreferenceComponent} from "./quickreference/quickreference.component";
import { QR_ROUTES } from "./quickreference/quickreference.routing"
import {LoginComponent} from "./login/login.component";
import {FQuickreferenceComponent} from "./f-quickreference/f-quickreference.component";
import {SoilmoistureComponent} from "./soilmoisture/soilmoisture.component";
import {SoiltemperatureComponent} from "./soiltemperature/soiltemperature.component";
import {AirtemperatureComponent} from "./airtemperature/airtemperature.component";
import {IUserlistComponent} from "./i-userlist/i-userlist.component";


const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'fquickreference', component:FQuickreferenceComponent},
  {path: 'soilmoisture', component:SoilmoistureComponent},
  {path: 'soiltemperature', component:SoiltemperatureComponent},
  {path: 'airtemperature', component:AirtemperatureComponent},
  {path: 'quickreference', component:QuickreferenceComponent},
  {path: 'iuserlist', component:IUserlistComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
