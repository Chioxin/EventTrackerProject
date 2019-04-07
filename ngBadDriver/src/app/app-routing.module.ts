import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ReportListComponent },
  { path: 'drivers/:id', component: ReportListComponent },
  { path: 'report', component: GenerateReportComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
