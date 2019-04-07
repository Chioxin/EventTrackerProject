import { Driver } from './../models/driver';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortList'
})
export class SortListPipe implements PipeTransform {

  transform(drivers: Driver[], type?: string, str?: string): any {

    if (type === undefined || type === '') {
      return drivers;
    }

    if (str === undefined || str === '') {
      return drivers;
    }

    let returnArray: Driver[] = [];

    switch (type) {
      case 'car':
        for (const driver of drivers) {
          if (driver.car.toLowerCase().includes(str.toLowerCase())) {
            returnArray.push(driver);
          }
        }
        break;

      case 'road':
        for (const driver of drivers) {
          if (driver.road.toLowerCase().includes(str.toLowerCase())) {
            returnArray.push(driver);
          }
        }
        break;

      case 'city':
        for (const driver of drivers) {
          if (driver.city.toLowerCase().includes(str.toLowerCase())) {
            returnArray.push(driver);
          }
        }
        break;

      default:
        returnArray = Object.assign({}, drivers);
        break;
    }


    return returnArray;
  }

}
