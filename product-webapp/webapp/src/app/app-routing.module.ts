
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { RegisterLoginComponent } from './component/register-login/register-login.component';
import { ViewProgramCardComponent } from './component/view-program-card/view-program-card.component';
import { ViewProgramManagerComponent } from './component/view-program-manager/view-program-manager.component';
// import { AddMemberCardComponent } from './component/add-member-card/add-member-card.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { TimeTrackerComponent } from './component/time-tracker/time-tracker.component';
import { MonthlyTrackerComponent } from './component/monthly-tracker/monthly-tracker.component';
import { MonthlyTrackerDetailsComponent } from './component/monthly-tracker-details/monthly-tracker-details.component';
import { AllChartsComponent } from './component/all-charts/all-charts.component';
import { BarChartComponent } from './component/charts-folder/bar-chart/bar-chart.component';
import { PieChartComponent } from './component/charts-folder/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './component/charts-folder/doughnut-chart/doughnut-chart.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DoughnutChart2Component } from './component/charts-folder/doughnut-chart2/doughnut-chart2.component';
import { ConsolidatedViewComponent } from './component/consolidated-view/consolidated-view.component';
import { BarChart2Component } from './component/charts-folder/bar-chart2/bar-chart2.component';
import { AuthGuard } from './guard/auth.guard';
import { ConsolidatedAnalyticsComponent } from './component/consolidated-analytics/consolidated-analytics.component';
import { LeavesComponent } from './component/leaves/leaves.component';

const routes: Routes = [

  {
    path: '',
    component: RegisterLoginComponent
  },
  // {
  //   path: 'calendar',
  //   component: CalendarComponent
  // },
  // {
  //   path: 'cv',
  //   component: ConsolidatedViewComponent
  // },
  // {
  //   path: 'mtd',
  //   component: MonthlyTrackerDetailsComponent
  // },
  {
    path: 'home',
    component: NavBarComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: ViewProgramManagerComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'view-program-manager',
        component: ViewProgramManagerComponent
      },
      {
        path: 'monthly-tracker',
        component: MonthlyTrackerComponent
      },
      {
        path: 'view-program-card',
        component: ViewProgramCardComponent
      },
      // {
      //   path: 'add-member-card',
      //   component: AddMemberCardComponent,
      // },
      {
        path: 'monthly-tracker',
        component: MonthlyTrackerComponent
      },
      {
        path: 'timetracker',
        component: TimeTrackerComponent
      },
      {
        path: 'lc',
        component: LeavesComponent
      },
      {
        path: 'can',
        component: ConsolidatedAnalyticsComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'cv',
        component: ConsolidatedViewComponent
      },
      {
        path: 'calendar/:email/:month/:year',
        component: CalendarComponent
      },
      {
        path: 'mtd/:email/:month/:year',
        component: MonthlyTrackerDetailsComponent
      },
      {
        path: 'analytics',
        component: AllChartsComponent,
        children: [
          { path: 'employee-distribution-in-external-programs', component: DoughnutChartComponent },
          { path: 'employee-distribution-in-internal-projects', component: DoughnutChart2Component },
          { path: 'external-programs', component: BarChartComponent },
          { path: 'internal-projects', component: BarChart2Component },
          { path: 'pie-chart', component: PieChartComponent },
          { path: '', component: BarChartComponent }
        ]
      },
    ]
  },
  {
    path: 'view-program-manager',
    component: ViewProgramManagerComponent,
  },
  {
    path: 'view-program-card',
    component: ViewProgramCardComponent,
  },
  // {
  //   path: 'add-member-card',
  //   component: AddMemberCardComponent,
  // },
  {
    path: 'monthly-tracker',
    component: MonthlyTrackerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
