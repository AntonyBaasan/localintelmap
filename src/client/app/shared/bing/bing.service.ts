/**
 * Created by Antony on 2016-06-13.
 */
import {Injectable} from '@angular/core';
import {Response, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';


/**
 * This class provides the Bing map service.
 */
@Injectable()
export class BingService {

  /**
   * Creates a new BingService with the injected Jsonp.
   * @param {Jsonp} JsonP - The injected Jsonp service.
   * @constructor
   */
  constructor(private jsonp:Jsonp) {
  }

  /**
   * Returns an Observable for the Jsonp GET request for the Bing resource.
   * @return {string[]} The Observable for the Jsonp request.
   */
  getLocation(postalCode:string):Observable<Response> {
    return this.jsonp.request(this.getUrl(postalCode));
  }

  /**
   * Returns an URL for the Bing resource.
   * @param {string} postalCode - Postal code of the location that we want to find.
   * @return {string[]} The Observable for the Jsonp request.
   */
  getUrl(postalCode:string):string {
    postalCode = postalCode.replace(/\s+/g, '');//remove all whitespaces
    return 'http://dev.virtualearth.net/REST/v1/Locations?postalCode=' + postalCode+'&includeNeighborhood=true&&include=true&maxResults=10&jsonp=JSONP_CALLBACK&key=AnRUDCdu-_iWgEH3v0e6btLysEOGP9kTyIE-gXa7YvIyMsr4rOFC4qeV6GeTzbQM';
  }
}

