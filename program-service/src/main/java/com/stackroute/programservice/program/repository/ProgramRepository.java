package com.stackroute.programservice.program.repository;

import com.stackroute.programservice.program.model.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends MongoRepository<Program, Long> {

    Program findByProgramName(String programName);
}