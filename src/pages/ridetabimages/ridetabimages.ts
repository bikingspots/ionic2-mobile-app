import {Component} from '@angular/core';
import {Tabs, NavController, NavParams, Platform} from 'ionic-angular';
import {Ride} from '../../entities/Ride';


@Component({
  templateUrl: './ridetabimages.html',
})

export class RideTabImages {

   
  // notre service
  private ride: Ride;
  public imagesgrid: any;
  private selectedImg: string = '';
  public showFullscreenImg: boolean = false;
 
 
  constructor(navCtrl: NavController, platform: Platform,  params: NavParams) {
    var count:number = 0;
    var rowIndex:number = 0;

    this.ride = params.get("ride");

    this.imagesgrid = [];
    this.imagesgrid[rowIndex] = [];

    for (let i = 0; i < this.ride.images.length; i++) {
      this.imagesgrid[rowIndex][count] = this.ride.images[i];

      count++;
      if(count == 3)
      {
        count = 0;
        rowIndex++;
        this.imagesgrid[rowIndex] = [];
      }
    }
  }
  
  public showOverlay(img: string):void {
    this.selectedImg = img;
    this.showFullscreenImg = true;
  }

  public closeOverlay():void {
    this.showFullscreenImg = false;
    this.selectedImg = '';
  }
}
