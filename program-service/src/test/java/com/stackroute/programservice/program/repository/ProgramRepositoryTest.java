package com.stackroute.programservice.program.repository;

import com.stackroute.programservice.program.model.Member;
import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.program.model.ProgramStatus;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
class ProgramRepositoryTest {

    @Autowired
    ProgramRepository programRepository;

    private Program program;
    private Member member;

    @BeforeEach
    void setUp(){

        member = new Member();
        member.setMemberEmailId("member1@email.com");

        program = new Program();
        program.setProgramCode(7);
        program.setOrganizationName("Google");
        program.setProgramType("Immersive");
        program.setProgramName("Program Name");
        program.setStartDate(1659571200000L);
        program.setEndDate(1691135324000L);
        program.setCreatedOn(System.currentTimeMillis());
        program.setStartTime("9:00");
        program.setEndTime("18:00");
        program.setManagerEmailId("manager@email.com");
        program.setMembersList(List.of(member));
        program.setProgramStatus(ProgramStatus.ACTIVE);
        program.setCostCode(9281);
        program.setCustomerId(1231);

    }

    @AfterEach
    public void afterMethod() {
        programRepository.delete(program);
    }

    @Test
    void findByProgramName() {
        programRepository.save(program);
        Program searchProgram = programRepository.findByProgramName(program.getProgramName());
        assertEquals(program, searchProgram);
    }
}