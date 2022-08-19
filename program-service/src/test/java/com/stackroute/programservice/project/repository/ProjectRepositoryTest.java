package com.stackroute.programservice.project.repository;

import com.stackroute.programservice.project.model.Project;
import com.stackroute.programservice.project.model.ProjectStatus;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    private Project project;

    @BeforeEach
    void setUp() {

        project = new Project();

        project.setProjectName("Project Name");
        project.setProjectCode(1101);
        project.setStartDate(1659571200000L);
        project.setEndDate(1691135324000L);
        project.setManagerEmailId("manager@email.com");
        project.setProjectStatus(ProjectStatus.ACTIVE);
        project.setCostCode(9281);
        project.setCustomerId(1231);
    }

    @AfterEach
    void tearDown() {
        projectRepository.delete(project);
    }

    @Test
    void findByProjectName() {
        projectRepository.save(project);
        Project searchProject = projectRepository.findByProjectName(project.getProjectName());
        assertEquals(project, searchProject);
    }
}