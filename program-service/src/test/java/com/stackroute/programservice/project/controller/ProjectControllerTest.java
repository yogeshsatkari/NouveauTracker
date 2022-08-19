package com.stackroute.programservice.project.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.programservice.project.model.Member;
import com.stackroute.programservice.project.model.Project;
import com.stackroute.programservice.project.model.ProjectStatus;
import com.stackroute.programservice.project.service.ProjectService;
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
class ProjectControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProjectService projectService;

    @InjectMocks
    private ProjectController projectController;

    private Project project;
    private Member member;

    @BeforeEach
    void setUp() {
        member = new Member();
        member.setMemberEmailId("member1@email.com");

        project = new Project();

        project.setProjectName("Project Name");
        project.setProjectCode(1101);
        project.setStartDate(1659571200000L);
        project.setEndDate(1691135324000L);
        project.setManagerEmailId("manager@email.com");
        project.setProjectStatus(ProjectStatus.ACTIVE);
        project.setMembersList(List.of(member));
        project.setCostCode(9281);
        project.setCustomerId(1231);

        mockMvc = MockMvcBuilders.standaloneSetup(projectController).build();
    }


    @Test
    void addNewProject() throws Exception {
        when(projectService.addProject(any())).thenReturn(project);

        MockMultipartFile mockMultipartFile = new MockMultipartFile("image", "image.jpeg", MediaType.IMAGE_JPEG_VALUE, "hello world".getBytes());
        mockMvc.perform(multipart("/api/v1/project").file(mockMultipartFile)
                .param("project", convertJsonToString(project))).andExpect(status().isCreated());
    }

    @Test
    void getAllProjects() throws Exception {
        when(projectService.getAllProjects()).thenReturn(List.of(project));
        mockMvc.perform(get("/api/v1/projects")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getByProjectName() throws Exception {
        when(projectService.getProjectByName(any())).thenReturn(project);
        mockMvc.perform(get("/api/v1/project/Project Name")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    void addMembersToProject() throws Exception {
        when(projectService.addMembersToProject("Project Name", List.of("member2@email.com"))).thenReturn(project);
        mockMvc.perform(put("/api/v1/project/member/Project Name").contentType(MediaType.APPLICATION_JSON)
                .content(convertJsonToString(List.of("member2@email.com")))).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getAllActiveProjectsOnParticularDate() throws Exception {
        when(projectService.getAllActiveProjectsOnParticularDate("member1@email.com", 1659589500000L))
                .thenReturn(List.of(project));
        mockMvc.perform(get("/api/v1/projects/member/member@email.com/1659589500000"))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    void removeMembersFromProject() {
    }

    @Test
    void deleteProject() throws Exception {
        when(projectService.deleteProject(any())).thenReturn("Project Deleted.");
        mockMvc.perform(delete("/api/v1/project/Project Name")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getProjectByManager() throws Exception {
        when(projectService.getProjectByManager("manager@email.com")).thenReturn(List.of(project));
        mockMvc.perform(get("/api/v1/projects/manager/manager@email.com")).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getProjectByStatus() throws Exception {
        when(projectService.getProjectByStatus("ACTIVE")).thenReturn(List.of(project));
        mockMvc.perform(get("/api/v1/project/status")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    void searchProjects() throws Exception {
        when(projectService.searchProjects(project, "1659589500000")).thenReturn(List.of(project));
        mockMvc.perform(post("/api/v1/projects/search").param("project", convertJsonToString(project))
                        .param("date", String.valueOf(1659589500000L))).andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void searchProjectsForManager() throws Exception {
        when(projectService.searchProjectsForManager("manager@email.com", project, "1659589500000"))
                .thenReturn(List.of(project));

        mockMvc.perform(post("/api/v1/projects/manager/search").param("project", convertJsonToString(project))
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