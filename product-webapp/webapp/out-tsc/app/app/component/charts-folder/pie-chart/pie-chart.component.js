import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PieChartComponent = class PieChartComponent {
    constructor() {
        this.pieChartLabels = ['Google Wave 2', 'IBM X1', 'Wipro B5', 'Infosys M2'];
        this.pieChartData = [120, 150, 180, 90];
        this.pieChartType = 'pie';
    }
    ngOnInit() {
    }
};
PieChartComponent = __decorate([
    Component({
        selector: 'app-pie-chart',
        templateUrl: './pie-chart.component.html',
        styleUrls: ['./pie-chart.component.css']
    })
], PieChartComponent);
export { PieChartComponent };
//# sourceMappingURL=pie-chart.component.js.map