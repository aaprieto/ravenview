import {Routes, RouterModule} from "@angular/router";
import {SoilmoistureComponent} from "../soilmoisture/soilmoisture.component";


export const QR_ROUTES: Routes = [
  {path:'', redirectTo:'/soilmoisture', pathMatch:'full'},
  {path: 'soilmoisture', component: SoilmoistureComponent},

];


