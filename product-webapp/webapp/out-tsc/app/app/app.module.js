import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericListFilterModule } from 'generic-list-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProgramComponent } from './component/add-program/add-program.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { TimeTrackerComponent } from './component/time-tracker/time-tracker.component';
import { MatRadioModule } from '@angular/material/radio';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { AvatarModule } from 'ngx-avatar';
import { ProgramCardComponent } from './component/program-card/program-card.component';
import { ProjectCardComponent } from './component/project-card/project-card.component';
import { RegisterLoginComponent } from './component/register-login/register-login.component';
import { ViewProgramCardComponent } from './component/view-program-card/view-program-card.component';
import { ViewProgramManagerComponent } from './component/view-program-manager/view-program-manager.component';
import { ProgramService } from './service/program.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MonthlyTrackerComponent } from './component/monthly-tracker/monthly-tracker.component';
import { AddProgramMembersComponent } from './component/add-program-members/add-program-members.component';
import { AddProjectMembersComponent } from './component/add-project-members/add-project-members.component';
import { ViewProjectCardComponent } from './component/view-project-card/view-project-card.component';
import { MatListModule } from '@angular/material/list';
import { MonthlyTrackerDetailsComponent } from './component/monthly-tracker-details/monthly-tracker-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChartsModule } from 'ng2-charts';
import { AllChartsComponent } from './component/all-charts/all-charts.component';
import { BarChartComponent } from './component/charts-folder/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './component/charts-folder/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './component/charts-folder/pie-chart/pie-chart.component';
import { ProfileComponent } from './component/profile/profile.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            ViewProgramManagerComponent,
            RegisterLoginComponent,
            ViewProgramCardComponent,
            NavBarComponent,
            RegisterLoginComponent,
            AddProgramComponent,
            AddProjectComponent,
            ProgramCardComponent,
            ProjectCardComponent,
            CalendarComponent,
            SnackbarComponent,
            TimeTrackerComponent,
            MonthlyTrackerComponent,
            SideNavComponent,
            AddProgramMembersComponent,
            AddProjectMembersComponent,
            ViewProjectCardComponent,
            MonthlyTrackerDetailsComponent,
            AllChartsComponent,
            BarChartComponent,
            DoughnutChartComponent,
            PieChartComponent,
            ProfileComponent
        ],
        imports: [
            CommonModule,
            AppRoutingModule,
            BrowserModule,
            BrowserAnimationsModule,
            FlexLayoutModule,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatCardModule,
            HttpClientModule,
            MatTabsModule,
            FormsModule,
            MatInputModule,
            MatCardModule,
            MatFormFieldModule,
            MatButtonModule,
            MatCheckboxModule,
            ReactiveFormsModule,
            HttpClientModule,
            MatPaginatorModule,
            GenericListFilterModule,
            NgxPaginationModule,
            MatGridListModule,
            MatDialogModule,
            MatSnackBarModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatChipsModule,
            MatSelectModule,
            MatToolbarModule,
            FlexLayoutModule,
            MatBadgeModule,
            MatExpansionModule,
            MatTooltipModule,
            MatRippleModule,
            MatMenuModule,
            MatSlideToggleModule,
            AvatarModule,
            GenericListFilterModule,
            MatRadioModule,
            MatSidenavModule,
            MatListModule,
            MatAutocompleteModule,
            MatDatepickerModule,
            MatNativeDateModule,
            ChartsModule
        ],
        providers: [ProgramService],
        bootstrap: [AppComponent],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ],
        entryComponents: [ViewProgramCardComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map