import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, } from '@angular/forms';
let AddProgramComponent = class AddProgramComponent {
    constructor(formBuilder, programService, snackBar, employeeService) {
        this.programService = programService;
        this.snackBar = snackBar;
        this.employeeService = employeeService;
        this.fileAttr = 'Choose File';
        this.managersArray = [];
        this.addProgramForm = formBuilder.group({
            organizationName: new FormControl('', Validators.required),
            programName: new FormControl('', Validators.required),
            programType: new FormControl('', Validators.required),
            programCode: new FormControl('', Validators.required),
            costCode: new FormControl('', Validators.required),
            customerId: new FormControl('', Validators.required),
            managerEmailId: new FormControl('', Validators.required),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required),
            startTime: new FormControl('', Validators.required),
            endTime: new FormControl('', Validators.required),
            image: new FormControl('', Validators.required),
        });
    }
    onFileUpload(event) {
        this.file = event.target.files[0];
        this.fileAttr = event.target.files[0].name;
    }
    getProgramTypes() {
        this.programService.getAllProgramType().subscribe((response) => {
            this.programType = response;
        });
    }
    saveProgram() {
        console.log(this.addProgramForm.value);
        const programData = new FormData();
        programData.append('image', this.file, this.file.name);
        programData.append('program', JSON.stringify(this.addProgramForm.value));
        this.programService.addProgram(programData).subscribe((response) => {
            this.openSuccessSnackBar();
            this.addProgramForm.reset();
            console.log(response);
        }, (error) => {
            this.openErrorSnackBar();
            console.log(error);
        });
    }
    openSuccessSnackBar() {
        this.snackBar.open('Program Created Successfully.', '', {
            duration: 3000,
        });
    }
    openErrorSnackBar() {
        this.snackBar.open('Some error occured while adding Program.', '', {
            duration: 3000,
        });
    }
    getAllManagers() {
        this.employeeService.getEmployeesByRole('MANAGER').subscribe((response) => {
            response.forEach(manager => {
                console.log(manager.emailId);
                this.managersArray.push(manager.emailId);
            });
        });
    }
    ngOnInit() {
        this.getProgramTypes();
        this.getAllManagers();
    }
};
__decorate([
    ViewChild('fileInput')
], AddProgramComponent.prototype, "fileInput", void 0);
AddProgramComponent = __decorate([
    Component({
        selector: 'app-add-program',
        templateUrl: './add-program.component.html',
        styleUrls: ['./add-program.component.css'],
    })
], AddProgramComponent);
export { AddProgramComponent };
//# sourceMappingURL=add-program.component.js.map