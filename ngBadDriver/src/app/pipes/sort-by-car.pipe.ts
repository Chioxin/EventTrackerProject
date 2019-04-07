import { Driver } from './../models/driver';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCar'
})
export class SortByCarPipe implements PipeTransform {

  transform(drivers: Driver[], carType?: string): Driver[] {
    if (carType === undefined || carType === '') {
      return drivers;
    }

    const returnArray: Driver[] = [];

    for (const driver of drivers) {
      if (driver.car.includes(carType)) {
        returnArray.push(driver);
      }
    }

    return returnArray;
  }

}
