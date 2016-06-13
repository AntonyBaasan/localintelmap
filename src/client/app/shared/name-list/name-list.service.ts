import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import {UserLocation} from './user-location';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  userLocations: UserLocation[] = [];

  /**
   * Contains the currently pending request.
   * @type {Observable<string[]>}
   */
  private request: Observable<UserLocation[]>;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource. If there was a previous successful request
   * (the local names array is defined and has elements), the cached version is returned
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<UserLocation[]> {
    if (this.userLocations && this.userLocations.length) {
      return Observable.from([this.userLocations]);
    }
    if (!this.request) {
      this.request = this.http.get('/assets/data.json')
        .map((response: Response) => response.json())
        // .map((data: string[]) => {
        .map((data: UserLocation[]) => {
          this.request = null;
          return this.userLocations = data;
        });
    }
    return this.request;
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value - The name to add.
   */
  add(name: string, postal: string): void {
    var userLocation: UserLocation = new UserLocation();
    userLocation.name = name;
    userLocation.postal = postal;
    this.userLocations.push(userLocation);
  }
}

