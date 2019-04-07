import { Driver } from './../models/driver';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  // FIELDS

  private url = 'http://localhost:8083/api/drivers';

  // CONSTRUCTOR

  constructor(
    private http: HttpClient
    ) { }

  // METHODS

  index() {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.get<Driver[]>(this.url, httpOptions);
  }

  show(id: number) {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.get<Driver>(this.url + '/' + id, httpOptions);
  }

  delete(id) {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.delete<Driver>(this.url + '/' + id, httpOptions);
  }

  update(id, driver) {
    this.setUpperCasePlate(driver);
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.put<Driver>(this.url + '/' + id, driver, httpOptions);
  }

  create(driver) {
    this.setUpperCasePlate(driver);
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.post<Driver>(this.url, driver, httpOptions);
  }

  private setUpperCasePlate(driver: Driver) {
    driver.plate = driver.plate.toUpperCase();
  }
}
