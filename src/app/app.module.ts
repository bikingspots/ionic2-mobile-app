import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {RideList} from '../pages/ridelist/ridelist';
import {RideMap} from '../pages/ridemap/ridemap';
import {RideTabs} from '../pages/ridetabs/ridetabs'
import {RideTabDetails} from '../pages/ridetabdetails/ridetabdetails'
import {RideTabImages} from '../pages/ridetabimages/ridetabimages'
import {RideTabMap} from '../pages/ridetabmap/ridetabmap'

import {BikingspotsService} from '../services/BikingspotsService';

@NgModule({
  declarations: [
    MyApp,
    RideList,
    RideMap,
    RideTabs,
    RideTabDetails,
    RideTabImages,
    RideTabMap
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RideList,
    RideMap,
    RideTabs,
    RideTabDetails,
    RideTabImages,
    RideTabMap
  ],
  providers: [BikingspotsService]
})
export class AppModule {}