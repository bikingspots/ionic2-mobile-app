import {GPSUtils} from '../entities/GPSUtils';

export class Ride{
  public name: string;
  public user: string;
  public userAvatar: string;
  public date: Date;

  public type: string;
  public address: string;
  public text: string;

  public file: string;
  public url: string;
  public gpxUrl: string
  
  public images: string[];
  public thumbnail: string;

  public lat: number;
  public lon: number;
  public length: number;
  public plusDeniv: number;
  public minusDeniv: number;
  public expo: number;
  public difficulty: number;

  public getUserAvatar(width: number, height: number):string {
    return ('http://www.bikingspots.ch/php/fitImage.php?w=' + width + '&h=' + height + '&file=' + this.user + '.jpg' + '&dir=../profiles/img/');
  }

  public getRandomThumbnail(width: number, height: number):string {
    var index = Math.floor(Math.random() * (this.images.length));

    console.log(this.images.length + " - " + index);

    return ('http://www.bikingspots.ch/php/cropImage.php?file=' + this.images[index] + '&w=' + width + '&h=' + height);
  }

  public getImageThumbnail(img:string, width: number, height: number):string {
    return ('http://www.bikingspots.ch/php/fitImage.php?file=' + img + (width != 0 ? '&w=' + width : '') + (height != 0 ? '&h=' + height : ''));
  }

  public getDistanceToPositionInMeters(lat: number, lon:number):number {
     return GPSUtils.getDistanceBetweenPositionsInMeters(this.lat, this.lon, lat, lon);
  }
}