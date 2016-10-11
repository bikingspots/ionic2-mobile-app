import {Geolocation} from 'ionic-native';
import {Component} from '@angular/core';
import {Tabs, NavController, NavParams, Platform} from 'ionic-angular';
import {Ride} from '../../entities/Ride';


@Component({
  templateUrl: './ridetabdetails.html',
})

export class RideTabDetails {

   
  // notre service
  public ride: Ride;
  private myPosition: any;
  private canNavigate: boolean = false;
  
 
  constructor(navCtrl: NavController, platform: Platform,  params: NavParams) {
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    this.ride = params.get("ride");
  }
}
