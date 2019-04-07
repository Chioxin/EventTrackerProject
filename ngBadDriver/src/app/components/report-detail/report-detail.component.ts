import { Driver } from './../../models/driver';
import { DriverService } from './../../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  // FIELDS

  detailDriver: Driver = null;

  // CONSTRUCTOR

  constructor(
    private svc: DriverService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // INIT

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      this.getDetailedView(routeId);
    }
  }

  // METHODS

  getDetailedView(id) {
    this.svc.show(id).subscribe(
      data => {
        this.detailDriver = data;
      },
      err => {
        console.log('ERROR, attempting to find driver by id (' + id + ')');
        console.log(err);
      }
    );
  }

}
