/**
 * Created by Antony on 2016-06-13.
 */

export class UserLocation {
  name:string;
  postal:string;
  isSelected:boolean;

  deserialize(input:any):UserLocation {
    this.name = input.name;
    this.postal = input.postal;
    return this;
  }
}
