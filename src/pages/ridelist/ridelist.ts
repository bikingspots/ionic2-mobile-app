import {Geolocation} from 'ionic-native';
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Ride} from '../../entities/Ride';
import {BikingspotsService} from '../../services/BikingspotsService';

import {RideTabs} from '../ridetabs/ridetabs'

@Component({
  templateUrl: './ridelist.html'
})

export class RideList {

  // notre service
  private ridesService:BikingspotsService
  private lastRides: Ride[];
  private popularRides: Ride[];
  private searchRidesResult: Ride[];
  private navCtrl: NavController;

  public hasSearchResults:Boolean;
 
  constructor(navCtrl: NavController, platform: Platform, ridesService: BikingspotsService) {

    this.navCtrl = navCtrl;
    this.ridesService = ridesService;
    this.hasSearchResults = false;

    this._getLastRides(5);
    this._getPopularRides(3);

    platform.ready().then(() => {
      // on récupère les dernières rides
      
      Geolocation.getCurrentPosition().then(
        (resp) => {
          console.log("Position: " + resp.coords.latitude + " - " + resp.coords.longitude);
        })
        .catch((error) => {
             console.log("Error:" + error.code + "/" + error.message);
        });
    });
  }

  public searchRides(ev: any):void{
    this.searchRidesResult = [];
    this.hasSearchResults = false;

    let searchTerm = ev.target.value;

    console.log("Search:" + searchTerm);
        
    // if the value is an empty string don't filter the items
    if (searchTerm && searchTerm.trim() != '') { 
      this.ridesService.search(searchTerm, 5).subscribe(data => {
        this.searchRidesResult = this.ridesService.parseRides(data.result);

        if(this.searchRidesResult.length > 0)
           this.hasSearchResults = true;
        });
    }
  }

  public openRide(ride: Ride):void{
    this.navCtrl.push(RideTabs,
                    {
                      ride: ride
                    });
  }

  private _getLastRides(limit: number):void{
    this.ridesService.getLast(limit).subscribe(data => {
      this.lastRides = this.ridesService.parseRides(data.result);
    });
  }

  private _getPopularRides(limit: number):void{
    this.ridesService.getPopular(limit).subscribe(data => {
      this.popularRides = this.ridesService.parseRides(data.result);
    });
  } 
}
