import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators, } from '@angular/forms';
let AddProjectComponent = class AddProjectComponent {
    constructor(formBuilder, programService, snackBar, employeeService) {
        this.programService = programService;
        this.snackBar = snackBar;
        this.employeeService = employeeService;
        this.managersArray = [];
        this.addProjectForm = formBuilder.group({
            projectName: new FormControl('', Validators.required),
            projectCode: new FormControl('', [Validators.required]),
            costCode: new FormControl('', Validators.required),
            customerId: new FormControl('', Validators.required),
            managerEmailId: new FormControl('', Validators.required),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required),
            image: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        this.getAllManagers();
    }
    onFileUpload(event) {
        this.file = event.target.files[0];
    }
    saveProject() {
        const projectData = new FormData();
        projectData.append('image', this.file, this.file.name);
        projectData.append('project', JSON.stringify(this.addProjectForm.value));
        this.programService.addProject(projectData).subscribe((response) => {
            this.addProjectForm.reset();
            this.openSuccessSnackBar();
            console.log(response);
        }, (error) => {
            console.log(error);
            this.openErrorSnackBar();
        });
    }
    openSuccessSnackBar() {
        this.snackBar.open('Project Created Successfully.', '', {
            duration: 3000,
        });
    }
    openErrorSnackBar() {
        this.snackBar.open('Some error occured while adding Project.', '', {
            duration: 3000,
        });
    }
    getAllManagers() {
        this.employeeService.getEmployeesByRole('MANAGER').subscribe((response) => {
            // console.log(response);
            response.forEach((manager) => {
                console.log(manager.emailId);
                this.managersArray.push(manager.emailId);
            });
        });
    }
};
AddProjectComponent = __decorate([
    Component({
        selector: 'app-add-project',
        templateUrl: './add-project.component.html',
        styleUrls: ['./add-project.component.css'],
    })
], AddProjectComponent);
export { AddProjectComponent };
//# sourceMappingURL=add-project.component.js.map