import { __decorate } from "tslib";
import { Component } from '@angular/core';
let DoughnutChartComponent = class DoughnutChartComponent {
    constructor() {
        this.doughnutChartLabel = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
        this.doughnutChartData = [120, 150, 180, 90];
        this.doughnutChartType = 'doughnut';
    }
    ngOnInit() {
    }
};
DoughnutChartComponent = __decorate([
    Component({
        selector: 'app-doughnut-chart',
        templateUrl: './doughnut-chart.component.html',
        styleUrls: ['./doughnut-chart.component.css']
    })
], DoughnutChartComponent);
export { DoughnutChartComponent };
//# sourceMappingURL=doughnut-chart.component.js.map