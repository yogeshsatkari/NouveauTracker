import { __decorate } from "tslib";
import { Component } from '@angular/core';
let BarChartComponent = class BarChartComponent {
    constructor() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }
    ngOnInit() {
    }
};
BarChartComponent = __decorate([
    Component({
        selector: 'app-bar-chart',
        templateUrl: './bar-chart.component.html',
        styleUrls: ['./bar-chart.component.css']
    })
], BarChartComponent);
export { BarChartComponent };
//# sourceMappingURL=bar-chart.component.js.map