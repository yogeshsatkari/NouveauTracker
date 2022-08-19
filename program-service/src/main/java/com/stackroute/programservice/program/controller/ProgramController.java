package com.stackroute.programservice.program.controller;

import com.google.gson.Gson;
import com.stackroute.programservice.program.exception.ProgramNotFoundException;
import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.program.model.ProgramStatus;
import com.stackroute.programservice.program.service.ProgramService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RefreshScope
@RequestMapping("/api/v1/")
public class ProgramController {

    Logger logger = LoggerFactory.getLogger(ProgramController.class);

    @Value("${programType}")
    List<String> programType;

    @GetMapping("/programtype")
    public List<String> getAllProgramType() {
        logger.info("Getting program types.");
        return programType;
    }

    @Autowired
    private ProgramService programService;

    //Adds new program.
    @PostMapping("/program")
    public ResponseEntity<?> addNewProgram(@RequestParam("program") String program, @RequestParam("image") MultipartFile multipartFile) throws IOException {

        Gson gson = new Gson();
        Program saveProgram = gson.fromJson(program, Program.class);

        saveProgram.setProgramId(programService.generateSequence(Program.SEQUENCE_NAME));
        saveProgram.setOrganizationBrandLogo(multipartFile.getBytes());
        saveProgram.setCreatedOn(System.currentTimeMillis());
        saveProgram.setProgramStatus(ProgramStatus.INACTIVE);
        saveProgram.setMembersList(new ArrayList<>());

        logger.info("New Program Created");

        return new ResponseEntity<>(programService.addProgram(saveProgram), HttpStatus.CREATED);
    }

    //Get all programs.
    @GetMapping("/programs")
    public ResponseEntity<?> getAllPrograms() throws ParseException {
        logger.info("Getting All Programs");
        return new ResponseEntity<>(programService.getAllPrograms(), HttpStatus.OK);
    }

    @GetMapping("/program/{programName}")
    public ResponseEntity<?> getByProgramName(@PathVariable String programName) {
        logger.info("Getting by programName" + programName);
        return new ResponseEntity<>(programService.getProgramByName(programName), HttpStatus.OK);
    }

    //Delete a program.
    @DeleteMapping("/program/{programName}")
    public ResponseEntity<?> deleteProgram(@PathVariable String programName) {
        logger.info("Removing Program");
        try {
            return new ResponseEntity<>(programService.deleteProgram(programName), HttpStatus.OK);
        } catch (ProgramNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Add Members to existing program.
    @PutMapping("/program/member/{programName}")
    public ResponseEntity<?> addMembersToProgram(@PathVariable String programName, @RequestBody List<String> memberList) {
        logger.info("Adding Members to Program.");
        try {
            return new ResponseEntity<>(programService.addMembersToProgram(programName, memberList), HttpStatus.OK);
        } catch (ProgramNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Remove members from program.
    @GetMapping("/program/member/{programName}/{memberEmail}")
    public ResponseEntity<?> removeMemberFromProgram(@PathVariable String programName, @PathVariable String memberEmail) {
        logger.info("Removing Members from Program");
        try {
            return new ResponseEntity<>(programService.removeMembersFromProgram(programName, memberEmail), HttpStatus.OK);
        } catch (ProgramNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Get all programs assigned to the specific manager.
    @GetMapping("/programs/manager/{managerEmail}")
    public ResponseEntity<?> getProgramByManager(@PathVariable String managerEmail) {
        logger.info("Getting all program assigned to manager.");
        return new ResponseEntity<>(programService.getProgramByManager(managerEmail), HttpStatus.OK);
    }

    //Get all active programs assigned to the specific member/employee for specific date.
    @GetMapping("/programs/member/{memberEmail}/{dateInMillis}")
    public ResponseEntity<?> getAllActiveProgramsOnParticularDate(@PathVariable String memberEmail, @PathVariable long dateInMillis) {
        logger.info("Getting all active programs on specific date.");
        return new ResponseEntity<>(programService.getAllActiveProgramsOnParticularDate(memberEmail, dateInMillis), HttpStatus.OK);
    }

    //Get all programs of particular organization.
    @GetMapping("program/organization/{organizationName}")
    public ResponseEntity<?> getProgramsByOrganizationName(@PathVariable String organizationName) {
        logger.info("Getting all programs of particular organization.");
        return new ResponseEntity<>(programService.getProgramByOrganizationName(organizationName), HttpStatus.OK);
    }

    //Get all programs as per there status.
    @GetMapping("program/status/{programStatus}")
    public ResponseEntity<?> getProgramByStatus(@PathVariable String programStatus) {
        logger.info("Getting all programs as per the status.");
        return new ResponseEntity<>(programService.getProgramByStatus(programStatus), HttpStatus.OK);
    }

    //Search programs as per the specific fields.
    @PostMapping("/programs/search")
    public ResponseEntity<?> searchPrograms(@RequestParam("program") String program, @RequestParam(value = "date", required = false) String searchDate) throws ParseException {

        Gson gson = new Gson();
        Program searchProgram = gson.fromJson(program, Program.class);

        logger.info("Searching Programs.");
        return new ResponseEntity<>(programService.searchPrograms(searchProgram, searchDate), HttpStatus.OK);
    }

    @PostMapping("/programs/manager/search")
    public ResponseEntity searchProgramsForManager(@RequestParam("program") String program, @RequestParam(value = "date", required = false) String searchDate, @RequestParam("manager") String managerEmail) throws ParseException {

        Gson gson = new Gson();
        Program searchProgram = gson.fromJson(program, Program.class);

        logger.info("Searching Programs for Manager.");
        return new ResponseEntity<>(programService.searchProgramsForManager(managerEmail, searchProgram, searchDate), HttpStatus.OK);

    }
}
