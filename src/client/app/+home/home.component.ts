import {FORM_DIRECTIVES} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {NameListService, UserLocation, BingService} from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [FORM_DIRECTIVES]
})
export class HomeComponent implements OnInit {

  newName:string;
  newPostal:string;
  selectedUserLocation:UserLocation;
  // mapResult: string;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService:NameListService, public bingService:BingService) {
  }

  /**
   * Calls the add method of the NameListService with the current newName value of the form.
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName():boolean {
    this.nameListService.add(this.newName, this.newPostal);
    this.newName = '';
    this.newPostal = '';
    return false;
  }

  /**
   * Calls Bing Map init method
   */
  ngOnInit() {
    this.setCurrentLocationSelected(false);

    //Global function used to initialize empty map
    GetMap();
  }

  clickRow(userLocation:UserLocation):void {

    this.setCurrentLocationSelected(false);
    this.setCurrentLocation(userLocation);
    this.setCurrentLocationSelected(true);

    this.findMapLocation(this.selectedUserLocation.postal);

  }

  findMapLocation(postalCode:string):void {
    this.bingService.getLocation(postalCode).subscribe(x=> {
      console.log('onNext: %s', JSON.stringify(x.json()));

      //Global function used to show and pin map point
      UpdateMap(x.json());
    });
  }

  setCurrentLocation(userLocation:UserLocation){
    this.selectedUserLocation = userLocation;
  }

  setCurrentLocationSelected(selected: boolean){
    if (this.selectedUserLocation)
      this.selectedUserLocation.isSelected = selected;
  }

}
