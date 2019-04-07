import { ActivatedRoute } from '@angular/router';
import { DriverService } from './../../services/driver.service';
import { Driver } from './../../models/driver';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  // FIELDS
  editing = false;
  detailedDriver: Driver = null;
  editDriver: Driver = null;
  drivers: Driver[] = [];
  public isCollapsed = false;
  searchString = '';
  searchBy = '';

  // CONSTRUCTOR

  constructor(
    private svc: DriverService,
    private currentRoute: ActivatedRoute
  ) { }

  // INIT

  ngOnInit() {
    const driverId = this.currentRoute.snapshot.paramMap.get('id');

    if (driverId) {
      this.getDetailedView(driverId);
    }

    this.loadDrivers();
  }

  // METHODS

  selectBackToDetail() {
    this.editDriver = null;
    this.editing = false;
  }

  selectToEdit() {
    this.editDriver = Object.assign({}, this.detailedDriver);
    this.editing = true;
  }

  loadDrivers() {
    this.svc.index().subscribe(
      data => {
        this.drivers = data;
      },
      err => {
        console.error('ERROR, Attempting to get a list of drivers.');
        console.error(err);
      }
    );
  }

  getDetailedView(id) {
    this.svc.show(id).subscribe(
      data => {
        this.detailedDriver = data;
        this.editing = false;
      },
      err => {
        console.log('ERROR, attempting to find driver by id (' + id + ') failed.');
        console.log(err);
      }
    );
  }

  deleteDriver(id) {
    this.svc.delete(id).subscribe(
      data => {
        this.detailedDriver = null;
        this.loadDrivers();
      },
      err => {
        console.error('ERROR, attempting to remove driver by id (' + id + ') failed.');
        console.error(err);
      }
    );
  }

  updateDriver() {
    this.svc.update(this.editDriver.id, this.editDriver).subscribe(
      data => {
        this.detailedDriver = data;
        this.editDriver = null;
        this.editing = false;
        this.loadDrivers();
      },
      err => {
        console.error('ERROR, attempting to update driver by id (' + this.editDriver.id + ') failed.');
        console.error(err);
      }
    );
  }
}
