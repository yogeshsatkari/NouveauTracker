package com.stackroute.programservice.program.service;

import com.stackroute.programservice.program.exception.ProgramNotFoundException;
import com.stackroute.programservice.program.model.Program;

import java.text.ParseException;
import java.util.List;

public interface ProgramService {
    long generateSequence(String sequence);

    Program addProgram(Program program);

    Program getProgramByName(String programName);

    List<Program> getAllPrograms() throws ParseException;

    List<Program> getAllActiveProgramsOnParticularDate(String memberEmail, long dateInMillis);

    List<Program> getProgramByManager(String managerEmail);

    String deleteProgram(String programName) throws ProgramNotFoundException;

    Program addMembersToProgram(String programName, List<String> memberList) throws ProgramNotFoundException;

    Program removeMembersFromProgram(String programName, String member) throws ProgramNotFoundException;

    List<Program> getProgramByOrganizationName(String organizationName);

    List<Program> getProgramByStatus(String programStatus);

    List<Program> searchPrograms(Program program, String searchDate);

    List<Program> searchProgramsForManager(String managerEmail, Program program, String searchDate);
}
