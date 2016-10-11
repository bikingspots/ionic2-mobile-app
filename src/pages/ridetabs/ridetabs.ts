import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {RideTabMap} from '../ridetabmap/ridetabmap';
import {RideTabDetails} from '../ridetabdetails/ridetabdetails';
import {RideTabImages} from '../ridetabimages/ridetabimages';

import {Ride} from '../../entities/Ride';



@Component({
  templateUrl: './ridetabs.html',
})

export class RideTabs {

  // Nos tabs
  public tabMap: any;
  public tabDetails: any; 
  public tabImages: any; 
 
  // Paramêtres de tab
  public selectedRide: Ride;
  public rideParams: any;
 
  constructor(navCtrl: NavController, platform: Platform,  params: NavParams) {
    this.selectedRide = params.get("ride");
    this.rideParams = {ride: this.selectedRide};

    this.tabMap = RideTabMap;
    this.tabDetails = RideTabDetails;
    this.tabImages = RideTabImages;
  }
}
