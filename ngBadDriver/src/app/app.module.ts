import { DriverService } from './services/driver.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { SortByCarPipe } from './pipes/sort-by-car.pipe';
import { SortListPipe } from './pipes/sort-list.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReportListComponent,
    ReportDetailComponent,
    NotFoundComponent,
    GenerateReportComponent,
    SortByCarPipe,
    SortListPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    DriverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
