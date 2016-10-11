 export class GPSUtils {
    public static getDistanceBetweenPositionsInMeters(lat1: number, lon1: number, lat2: number, lon2:number):number {
        var R = 6371000; // Radius of the earth in km
        var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this._deg2rad(lon2-lon1); 

        lat1 = this._deg2rad(lat1);
        lat2 = this._deg2rad(lat2);

        var a = (Math.sin(dLat/2) * Math.sin(dLat/2)) + (Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in m
        return d;
    }

    private static _deg2rad(deg):number {
        return deg * (Math.PI/180)
    }
  }