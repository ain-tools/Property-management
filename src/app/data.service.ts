import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) { }
}
