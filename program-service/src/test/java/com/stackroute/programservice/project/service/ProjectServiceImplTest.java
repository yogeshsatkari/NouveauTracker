package com.stackroute.programservice.project.service;

import com.stackroute.programservice.program.model.Program;
import com.stackroute.programservice.project.exception.ProjectNotFoundException;
import com.stackroute.programservice.project.model.Member;
import com.stackroute.programservice.project.model.Project;
import com.stackroute.programservice.project.model.ProjectStatus;
import com.stackroute.programservice.project.repository.ProjectRepository;
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
class ProjectServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private ProjectServiceImpl projectService;

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
    }

//    @Test
//    void generateSequence() {
//    }

    @Test
    void addProject() {
        when(projectRepository.save(any())).thenReturn(project);
        assertEquals(project, projectService.addProject(project));
    }

    @Test
    void getAllProjects() throws ParseException {
        when(mongoTemplate.find(new Query().with(Sort.by(Sort.Direction.DESC, "createdOn")), Project.class))
                .thenReturn(List.of(project));

        assertEquals(List.of(project), projectService.getAllProjects());
    }

    @Test
    void getAllActiveProjectsOnParticularDate() {
        when(projectRepository.findAll()).thenReturn(List.of(project));
        assertEquals(List.of(project), projectService.getAllActiveProjectsOnParticularDate("member1@email.com", 1659589500000L));
    }

    @Test
    void getProjectByManager() {
        Query query = new Query();

        when(mongoTemplate.find(query.addCriteria(where("managerEmailId").is("manager@email.com")), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.with(Sort.by(Sort.Direction.DESC, "createdOn")), Project.class)).thenReturn(List.of(project));
        assertEquals(List.of(project), projectService.getProjectByManager(project.getManagerEmailId()));
    }

    @Test
    void deleteProject() throws ProjectNotFoundException {
        when(projectRepository.findByProjectName(any())).thenReturn(project);
        assertEquals("Project Deleted.", projectService.deleteProject(project.getProjectName()));
    }

    @Test
    void addMembersToProject() throws ProjectNotFoundException {
        when(projectRepository.findByProjectName(any())).thenReturn(project);
        when(projectRepository.save(any())).thenReturn(project);
        assertEquals(project, projectService.addMembersToProject(project.getProjectName(), List.of("member2@email.com")));
    }

    @Test
    void removeMembersFromProject() throws ProjectNotFoundException {
        when(projectRepository.findByProjectName(any())).thenReturn(project);
        when(projectRepository.save(any())).thenReturn(project);
        assertEquals(project, projectService.removeMembersFromProject(project.getProjectName(), "member2@email.com"));

    }

    @Test
    void getProjectByName() {
        when(projectRepository.findByProjectName(any())).thenReturn(project);
        assertEquals(project, projectService.getProjectByName(project.getProjectName()));
    }

    @Test
    void getProjectByStatus() {
        when(mongoTemplate.find(new Query().addCriteria(where("projectStatus").is("ACTIVE")), Project.class)).thenReturn(List.of(project));
        assertEquals(List.of(project), projectService.getProjectByStatus("ACTIVE"));
    }

    @Test
    void searchProjects() {
        Query query = new Query();

        when(mongoTemplate.find(query.addCriteria(where("projectName").regex("^" + project.getProjectName())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("managerEmailId").is(project.getManagerEmailId())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("projectStatus").is(project.getProjectStatus())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("startDate").lte(1659589500000L)), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("endDate").gte(1659589500000L)), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.with(Sort.by(Sort.Direction.DESC, "createdOn")), Project.class)).thenReturn(List.of(project));

        assertEquals(List.of(project), projectService.searchProjects(project, "1659589500000"));
    }

    @Test
    void searchProjectsForManager() {
        Query query = new Query();

        when(mongoTemplate.find(query.addCriteria(where("managerEmailId").is(project.getManagerEmailId())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("projectName").regex("^" + project.getProjectName())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("startDate").lte(1659589500000L)), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("endDate").gte(1659589500000L)), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.addCriteria(where("projectStatus").is(project.getProjectStatus())), Project.class)).thenReturn(List.of(project));
        when(mongoTemplate.find(query.with(Sort.by(Sort.Direction.DESC, "createdOn")), Project.class)).thenReturn(List.of(project));

        assertEquals(List.of(project), projectService.searchProjectsForManager("manager@email.com", project, "1659589500000"));
    }
}
