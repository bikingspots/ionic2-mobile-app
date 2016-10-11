import {Geolocation} from 'ionic-native';
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Ride} from '../../entities/Ride';
import {BikingspotsService} from '../../services/BikingspotsService';

declare var google;

@Component({
  templateUrl: './ridemap.html',
  providers:[BikingspotsService]
})

export class RideMap {
  //@ViewChild('map') mapElement:ElementRef;
  public map: any;
 
  // notre service
  public ridesService:BikingspotsService
  public lastRides: Ride[];
  public popularRides: Ride[];
  
  constructor(platform: Platform, ridesService: BikingspotsService) {

    this.ridesService = ridesService;

    platform.ready().then(() => {
      Geolocation.getCurrentPosition().then(
        (resp) => {
          console.log("Position: " + resp);
          this._loadMap(resp.coords.latitude,resp.coords.longitude);
          this._getLastRides(5);
        })
        .catch((error) => {
          console.log("Error:" + error.code + "/" + error.message);
          this._loadMap(46.53,6.54);
          this._getLastRides(5);
        });
    });
  }
  
  private _getLastRides(limit: number):void{
    this.ridesService.getLast(limit).subscribe(data => {
      this.lastRides = this.ridesService.parseRides(data.result);

      for(let i = 0 ; i < this.lastRides.length ; i++){
        this._addRideMarker(this.lastRides[i]);
      }
    });
  }

  private _addRideMarker(ride:Ride):void{
    let marker = new google.maps.Marker({
        position:new google.maps.LatLng(ride.lat, ride.lon),
        title: ride.name,
        animation: google.maps.Animation.DROP,
        dragable: false
    });

    marker.setMap(this.map);

     var infoWindow = new google.maps.InfoWindow({
          content: "<h1>" + ride.name + "</h1><p>" + ride.address + " | " + ride.type + "</p><p><img style='width:50%' src='" + ride.getRandomThumbnail(600,600) + "'></p>"
      });

    marker.addListener('click', function () {
          infoWindow.open(this.map, this);
      });
  }

  private _loadMap(lat:number, lon:number):void{
    let mapOptions = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
}
