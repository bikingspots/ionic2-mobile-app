import {Geolocation} from 'ionic-native';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Tabs, NavController, NavParams, Platform} from 'ionic-angular';
import {Ride} from '../../entities/Ride';
import * as Leaflet from "leaflet";
//import {Rating} from '../../entities/Rating';
import {BikingspotsService} from '../../services/BikingspotsService';
import {GPSUtils} from '../../entities/GPSUtils';


//declare var Leaflet;
declare var omnivore;
declare var Chart;

@Component({
  templateUrl: './ridetabmap.html',
  providers: [BikingspotsService]//,
  //directives: [Rating]
})

export class RideTabMap {
  @ViewChild('myChart') myChart: ElementRef;

  // notre service
  private ridesService:BikingspotsService
  
  private navCtrl: NavController;
  public ride: Ride;
  private myPosition: any;
  private canNavigate: boolean = false;
  
  private hideMap: boolean = false;
  private hideDetails: boolean = true;
  private map: any;

 
  constructor(navCtrl: NavController, platform: Platform,  params: NavParams, ridesService: BikingspotsService) {
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    
    this.navCtrl = navCtrl;
    this.ridesService = ridesService;
    this.ride = params.get("ride");

    platform.ready().then(() => {
      // workaround to make sure map is loaded correctly...
      setTimeout(this._loadMap.bind(this), 100);
      
      // try to get current location
      Geolocation.getCurrentPosition(locationOptions).then(
        (position) => {
          console.log("Position:" + position.coords.latitude + "/" + position.coords.longitude);
          this.myPosition = position;
          this.canNavigate = true;
          //this.ride.getDistanceToPositionInMeters(this.myPosition.coords.latitude,this.myPosition.coords.longitude);
        },
        (error) => {
         // this.distanceToRide = 1254;
          console.log("Error:" + error.code + "/" + error.message);
        });
    });
  }

  public guideRide(ride: Ride):void{
    /*this.navCtrl.push(GuideRide,
                    {
                      ride: ride
                    });*/
  }

  ngAfterViewInit() {
    this._displayRideAltitudeProfile(this.ride, this.myChart.nativeElement);
  }

   private _displayRideAltitudeProfile(ride: Ride, ctx: any):void{
    this.ridesService.getRideWaypoints(ride).subscribe(data => {
      var chartData:any = [];
      var dist = 0;
      let step = 5;
      var chartIndex = 0;

      for(let i = 0 ; i < data.data.waypoint.length ; i++)
      {
        
        if(i!=0)
        {
          dist += GPSUtils.getDistanceBetweenPositionsInMeters(data.data.waypoint[i-1].lat,data.data.waypoint[i-1].lon,data.data.waypoint[i].lat,data.data.waypoint[i].lon);
        }
        
        if(i%step == 0)
        {
          chartData[chartIndex] = {
                        x:dist/1000,
                        y:data.data.waypoint[i].altitude
                      };
          chartIndex++;
        }
      }

      var altitudeChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                    label: 'Altitude',
                    data: chartData,
                    borderColor: "#006600",
                    pointRadius: 0,
                    pointHitRadius: 10
                }]
            
        },
        options: {
            legend: {
              display: false
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                      stepSize: 10,
                      max: dist/1000 - (dist/1000 % 10)
                    }
                }]
            }
        }
      });

/*
      var altitudeChart = new Chart(ctx, {
        type: 'line',
        data: {
                datasets: [{
                    label: 'Altitude',
                    data: chartData
                }]
              },
        options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                                     beginAtZero:true
                                  }
                              }]
                          }
                }
        });
        */
    });
  }
 
  private _loadMap() {
    let map = this.map;

    map = Leaflet
      .map("map")
      .setView(Leaflet.latLng(46, 6), 13);

    Leaflet.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png').addTo(map);

    
    
   var rideLayer = omnivore.gpx(this.ride.gpxUrl)
    .on('ready', function() {
        console.log('loaded')
        map.fitBounds(rideLayer.getBounds());
     })
    .addTo(map);
   
  }
}
