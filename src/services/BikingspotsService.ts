import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Ride} from '../entities/Ride';


@Injectable()
export class BikingspotsService {

 constructor(private http: Http){}

  // Get a specific ride data
  public getRideWaypoints(ride: Ride):Observable<any>{
    return this.http.get('http://www.bikingspots.ch/createJSONFile.php?filename=' + ride.file)
      .map(res=>res.json());
  }
  
  // Get data
  public getLast(limit: number):Observable<any>{
    return this.http.get('http://www.bikingspots.ch/api/api.php?method=json&type=last&limit=' + limit)
      .map(res=>res.json());

  }

  public getPopular(limit: number):Observable<any>{
    return this.http.get('http://www.bikingspots.ch/api/api.php?method=json&type=popular&limit=' + limit)
      .map(res=>res.json());
  }

  public search(text: string, limit: number):Observable<any>{
    return this.http.get('http://www.bikingspots.ch/api/api.php?method=json&type=search&q=' + text + '&limit=' + limit)
      .map(res=>res.json());
  }


  public parseRides(data:any[]):Ride[]{

    let array:Ride[] = [];

    for(let i = 0 ; i < data.length ; i++){
      let ride = new Ride();

      ride.name = data[i].name;
      ride.user = data[i].user;
      ride.userAvatar = ride.getUserAvatar(300,300);

      ride.date = new Date(data[i].date);

      ride.address = data[i].address;
      ride.type = data[i].type;
      ride.text = data[i].text;
      
      ride.file = data[i].file;
      ride.url = data[i].url;
      ride.gpxUrl = data[i].gpxurl;
      
      ride.images = [];
      if(data[i].images.count > 0)
      {
          for(let j = 0 ; j < data[i].images.count ; j++){
            ride.images.push(data[i].images[j].substr(data[i].images[j].lastIndexOf('/') + 1));
          }

          ride.thumbnail = ride.getRandomThumbnail(600,600);
      }

      ride.lat = data[i].latitude;
      ride.lon = data[i].longitude;
      ride.length = data[i].length;
      ride.plusDeniv = data[i].pdeniv;
      ride.minusDeniv = data[i].mdeniv;
      ride.expo = data[i].expo;
      ride.difficulty = data[i].difficulty;

      array.push(ride);
    }

    return array;
  }

  
}
