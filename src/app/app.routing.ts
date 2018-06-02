/**
 * Created by Arnold on 2018-04-21.
 */
import {Routes, RouterModule} from "@angular/router";
import {QuickreferenceComponent} from "./quickreference/quickreference.component";
import { QR_ROUTES } from "./quickreference/quickreference.routing"


const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/quickreference', pathMatch:'full'},

  {path: 'quickreference', component:QuickreferenceComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
