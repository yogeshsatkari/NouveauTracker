export var ProgramType;
(function (ProgramType) {
    ProgramType["IMMERSIVE"] = "IMMERSIVE";
    ProgramType["WEEKEND"] = "WEEKEND";
})(ProgramType || (ProgramType = {}));
export class Program {
    constructor() {
        this.organisationName = '';
        this.organisationBrandLogo =
            'https://source.unsplash.com/150x150/?logo,fire';
        this.programType = ProgramType.IMMERSIVE;
        this.programName = '';
        this.startDate = 'dd/mm/yyyy';
        this.endDate = 'dd/mm/yyyy';
        this.managerEmail = '';
        this.members = [];
    }
}
//# sourceMappingURL=program.js.map