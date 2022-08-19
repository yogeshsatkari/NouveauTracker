package com.stackroute.programservice.program.service;

import com.stackroute.programservice.program.exception.ProgramNotFoundException;
import com.stackroute.programservice.program.model.Member;
import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.program.model.ProgramStatus;
import com.stackroute.programservice.program.repository.ProgramRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.text.ParseException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ProgramServiceImplTest {

    @Mock
    ProgramRepository programRepository;

    @Mock
    MongoTemplate mongoTemplate;

    @InjectMocks
    private ProgramServiceImpl programService;

    private Program program;
    private Member member;

    @BeforeEach
    void setUp() {

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

//    @Test
//    void generateSequence() {
//    }

    @Test
    void getProgramByName() {
        when(programRepository.findByProgramName(any())).thenReturn(program);
        assertEquals(program, programService.getProgramByName(program.getProgramName()));
    }

    @Test
    void addProgram() {
        when(programRepository.save(any())).thenReturn(program);
        assertEquals(program, programService.addProgram(program));
    }

    @Test
    void getAllPrograms() throws ParseException {
        when(mongoTemplate.find(new Query().with(Sort.by(Sort.Direction.DESC, "createdOn")), Program.class))
                .thenReturn(List.of(program));

        assertEquals(List.of(program), programService.getAllPrograms());
    }

    @Test
    void getAllActiveProgramsOnParticularDate() {
        when(programRepository.findAll()).thenReturn(List.of(program));
        assertEquals(List.of(program), programService.getAllActiveProgramsOnParticularDate("member1@email.com", 1659589500000L));
    }

    @Test
    void getProgramByManager() {
        when(mongoTemplate.find(new Query().addCriteria(where("managerEmailId").is(program.getManagerEmailId())).with(Sort.by(Sort.Direction.DESC, "createdOn")), Program.class)).thenReturn(List.of(program));
        assertEquals(List.of(program), programService.getProgramByManager(program.getManagerEmailId()));
    }

    @Test
    void deleteProgram() throws ProgramNotFoundException {
        when(programRepository.findByProgramName(any())).thenReturn(program);
        assertEquals("Program Deleted.", programService.deleteProgram(program.getProgramName()));
    }

    @Test
    void addMembersToProgram() throws ProgramNotFoundException {
        when(programRepository.findByProgramName(any())).thenReturn(program);
        when(programRepository.save(any())).thenReturn(program);
        assertEquals(program, programService.addMembersToProgram(program.getProgramName(), List.of("member2@email.com")));
    }

    @Test
    void removeMembersFromProgram() throws ProgramNotFoundException {
        when(programRepository.findByProgramName(any())).thenReturn(program);
        when(programRepository.save(any())).thenReturn(program);
        assertEquals(program, programService.removeMembersFromProgram(program.getProgramName(), "member2@email.com"));
    }

    @Test
    void getProgramByOrganizationName() {
        when(mongoTemplate.find(new Query().addCriteria(where("organizationName").is("Google")), Program.class)).thenReturn(List.of(program));
        assertEquals(List.of(program), programService.getProgramByOrganizationName("Google"));
    }

    @Test
    void getProgramByStatus() {
        when(mongoTemplate.find(new Query().addCriteria(where("programStatus").is("ACTIVE")), Program.class)).thenReturn(List.of(program));
        assertEquals(List.of(program), programService.getProgramByStatus("ACTIVE"));
    }

    @Test
    void searchPrograms() {
        Query query = new Query();

        when(mongoTemplate.find(query.addCriteria(where("programName").regex("^" + program.getProgramName())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("startDate").lte(1659589500000L)), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("endDate").gte(1659589500000L)), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("programStatus").is(program.getProgramStatus())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("organizationName").is(program.getOrganizationName())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("managerEmailId").is(program.getManagerEmailId())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.with(Sort.by(Sort.Direction.DESC, "createdOn")), Program.class)).thenReturn(List.of(program));

        assertEquals(List.of(program), programService.searchPrograms(program, "1659589500000"));
    }

    @Test
    void searchProgramsForManager() {
        Query query = new Query();

        when(mongoTemplate.find(query.addCriteria(where("managerEmailId").is(program.getManagerEmailId())), Program.class)).thenReturn(List.of(program));

        when(mongoTemplate.find(query.addCriteria(where("programName").regex("^" + program.getProgramName())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("startDate").lte(1659589500000L)), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("endDate").gte(1659589500000L)), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("programStatus").is(program.getProgramStatus())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.addCriteria(where("organizationName").is(program.getOrganizationName())), Program.class)).thenReturn(List.of(program));
        when(mongoTemplate.find(query.with(Sort.by(Sort.Direction.DESC, "createdOn")), Program.class)).thenReturn(List.of(program));

        assertEquals(List.of(program), programService.searchProgramsForManager("manager@email.com", program, "1659589500000"));

    }
}
