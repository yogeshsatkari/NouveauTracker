import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
const routes = [
    {
        path: '',
        component: RegisterLoginComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'mtd',
        component: MonthlyTrackerDetailsComponent
    },
    {
        path: 'home',
        component: NavBarComponent,
        children: [
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
                path: 'calendar',
                component: CalendarComponent
            },
            {
                path: 'calendar/:email/:month/:year',
                component: CalendarComponent
            },
            {
                path: 'charts',
                component: AllChartsComponent,
                children: [
                    { path: 'bar-chart', component: BarChartComponent },
                    { path: 'doughnut-chart', component: DoughnutChartComponent },
                    { path: 'pie-chart', component: PieChartComponent },
                    { path: '', component: DoughnutChartComponent }
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
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map