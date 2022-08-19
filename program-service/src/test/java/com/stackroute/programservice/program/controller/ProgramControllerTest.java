package com.stackroute.programservice.program.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.programservice.program.model.Member;
import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.program.model.ProgramStatus;
import com.stackroute.programservice.program.service.ProgramService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ProgramControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProgramService programService;

    @InjectMocks
    private ProgramController programController;

    private Program program;

    @BeforeEach
    void setUp() {

        Member member = new Member();
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
        program.setProgramStatus(ProgramStatus.ACTIVE);
        program.setCostCode(9281);
        program.setCustomerId(1231);

        mockMvc = MockMvcBuilders.standaloneSetup(programController).build();
    }

//    @Test
//    void getAllProgramType() {
//    }

    @Test
    void addNewProgram() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "image.jpeg", MediaType.IMAGE_JPEG_VALUE, "Hello World".getBytes());
        when(programService.addProgram(any())).thenReturn(program);
        mockMvc.perform(multipart("/api/v1/program").file(file).param("program", convertJsonToString(program))).andExpect(status().isCreated());
    }

    @Test
    void getAllPrograms() throws Exception {
        when(programService.getAllPrograms()).thenReturn(List.of(program));
        mockMvc.perform(get("/api/v1/programs")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getByProgramName() throws Exception {
        when(programService.getProgramByName(any())).thenReturn(program);
        mockMvc.perform(get("/api/v1/program/Program Name")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void deleteProgram() throws Exception {
        when(programService.deleteProgram(any())).thenReturn("Program Deleted.");
        mockMvc.perform(delete("/api/v1/program/Program Name")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void addMembersToProgram() throws Exception {
        when(programService.addMembersToProgram("Program Name", List.of("member2@email.com"))).thenReturn(program);
        mockMvc.perform(put("/api/v1/program/member/Program Name")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertJsonToString(List.of("member2@email.com")))).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void removeMemberFromProgram() throws Exception {
        when(programService.removeMembersFromProgram("Program Name", "member1@email.com")).thenReturn(program);
        mockMvc.perform(get("/api/v1/program/member/Program Name/member1@email.com")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getProgramByManager() throws Exception {
        when(programService.getProgramByManager("manager@email.com")).thenReturn(List.of(program));
        mockMvc.perform(get("/api/v1/programs/manager/manager@email.com")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getAllActiveProgramsOnParticularDate() throws Exception {
        when(programService.getAllActiveProgramsOnParticularDate("member1@email.com", 1659589500000L)).thenReturn(List.of(program));
        mockMvc.perform(get("/api/v1/programs/member/member1@email.com/1659589500000")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getProgramsByOrganizationName() throws Exception {
        when(programService.getProgramByOrganizationName("Google")).thenReturn(List.of(program));
        mockMvc.perform(get("/api/v1/program/organization/Google")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getProgramByStatus() throws Exception {
        when(programService.getProgramByStatus("ACTIVE")).thenReturn(List.of(program));
        mockMvc.perform(get("/api/v1/program/status/ACTIVE")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void searchPrograms() throws Exception {
        when(programService.searchPrograms(program, "1659589500000")).thenReturn(List.of(program));
        mockMvc.perform(post("/api/v1/programs/search").param("program", convertJsonToString(program))
                        .param("date", String.valueOf(1659589500000L)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    void searchProgramsForManager() throws Exception {
        when(programService.searchProgramsForManager("manager@email.com", program, "1659589500000"))
                .thenReturn(List.of(program));
        mockMvc.perform(post("/api/v1/programs/manager/search").param("program", convertJsonToString(program))
                        .param("date", String.valueOf(1659589500000L)).param("manager", "manager@email.com"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    public static String convertJsonToString(Object obj) {
        String result = null;

        try {
            ObjectMapper mapper = new ObjectMapper();
            result = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException jsonexce) {
            System.out.println("Error Processing in Json:" + jsonexce);
        }

        return result;
    }

}