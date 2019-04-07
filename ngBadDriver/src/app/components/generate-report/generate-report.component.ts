import { DriverService } from './../../services/driver.service';
import { Driver } from './../../models/driver';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  // FIELDS

  newDriver: Driver = new Driver();

  // CONSTRUCTOR

  constructor(
    private driverService: DriverService,
    private router: Router
    ) { }

  // INIT

  ngOnInit() {
  }

  // METHODS

  enterNewDriver() {
    this.driverService.create(this.newDriver).subscribe(
      data => {
        this.router.navigateByUrl('/drivers/' + data.id);
        this.newDriver = new Driver();
      },
      err => {
        console.error('ERROR, could not create a new driver');
        console.error(this.newDriver);
        console.error(err);
      }
    );
  }

}
