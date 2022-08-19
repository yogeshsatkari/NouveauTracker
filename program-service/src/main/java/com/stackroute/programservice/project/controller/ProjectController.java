package com.stackroute.programservice.project.controller;

import com.google.gson.Gson;
import com.stackroute.programservice.project.exception.ProjectNotFoundException;
import com.stackroute.programservice.project.model.Project;
import com.stackroute.programservice.project.model.ProjectStatus;
import com.stackroute.programservice.project.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
public class ProjectController {

    Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectService projectService;

    //Adds new project.
    @PostMapping("/project")
    public ResponseEntity<?> addNewProject(@RequestParam("project") String project, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        Gson gson = new Gson();
        Project saveProject = gson.fromJson(project, Project.class);
        saveProject.setProjectId(projectService.generateSequence(Project.SEQUENCE_NAME));
        saveProject.setOrganizationBrandLogo(multipartFile.getBytes());
        saveProject.setCreatedOn(System.currentTimeMillis());
        saveProject.setProjectStatus(ProjectStatus.INACTIVE);
        saveProject.setMembersList(new ArrayList<>());

        logger.info("New Project Created.");
        return new ResponseEntity<>(projectService.addProject(saveProject), HttpStatus.CREATED);
    }

    //Get all project.
    @GetMapping("/projects")
    public ResponseEntity<?> getAllProjects() throws ParseException {
        logger.info("Getting all projects.");
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @GetMapping("/project/{projectName}")
    public ResponseEntity getByProjectName(@PathVariable String projectName) {
        logger.info("Getting project by project name.");
        return new ResponseEntity(projectService.getProjectByName(projectName), HttpStatus.OK);
    }

    //Add Members to existing project.
    @PutMapping("/project/member/{projectName}")
    public ResponseEntity<?> addMembersToProject(@PathVariable String projectName, @RequestBody List<String> members) {
        logger.info("Add members to project");

        try {
            return new ResponseEntity<>(projectService.addMembersToProject(projectName, members), HttpStatus.OK);
        } catch (ProjectNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Get all active project assigned to the specific member/employee for specific date.
    @GetMapping("/projects/member/{memberEmail}/{dateInMillis}")
    public ResponseEntity<?> getAllActiveProjectsOnParticularDate(@PathVariable String memberEmail, @PathVariable long dateInMillis) {
        logger.info("Get projects on specific date.");
        return new ResponseEntity<>(projectService.getAllActiveProjectsOnParticularDate(memberEmail, dateInMillis), HttpStatus.OK);
    }

    //Remove members from project.
    @GetMapping("/project/member/{projectName}/{memberEmail}")
    public ResponseEntity<?> removeMembersFromProject(@PathVariable String projectName, @PathVariable String memberEmail) {
        logger.info("Remove members from Project.");
        try {
            return new ResponseEntity<>(projectService.removeMembersFromProject(projectName, memberEmail), HttpStatus.OK);
        } catch (ProjectNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Delete a project.
    @DeleteMapping("/project/{projectName}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectName) {
        logger.info("Removing Project.");
        try {
            return new ResponseEntity<>(projectService.deleteProject(projectName), HttpStatus.OK);
        } catch (ProjectNotFoundException pnfException) {
            logger.error(String.valueOf(pnfException));
            return new ResponseEntity<>(pnfException, HttpStatus.NOT_FOUND);
        }
    }

    //Get all project assigned to the specific manager.
    @GetMapping("/projects/manager/{managerEmail}")
    public ResponseEntity<?> getProjectByManager(@PathVariable String managerEmail) {
        logger.info("Getting All Projects assigned to manager.");
        return new ResponseEntity<>(projectService.getProjectByManager(managerEmail), HttpStatus.OK);
    }

    //Get all project as per there status.
    @GetMapping("/project/status/{projectStatus}")
    public ResponseEntity<?> getProjectByStatus(@PathVariable String projectStatus) {
        logger.info("Get Projects as per there status.");
        return new ResponseEntity<>(projectService.getProjectByStatus(projectStatus), HttpStatus.OK);
    }

    @PostMapping("/projects/search")
    public ResponseEntity<?> searchProjects(@RequestParam("project") String project, @RequestParam(value = "date", required = false) String searchDate) throws ParseException {

        Gson gson = new Gson();
        Project searchProject = gson.fromJson(project, Project.class);

        logger.info("Search Projects");
        return new ResponseEntity<>(projectService.searchProjects(searchProject, searchDate), HttpStatus.OK);
    }

    @PostMapping("/projects/manager/search")
    public ResponseEntity<?> searchProjectsForManager(@RequestParam("project") String project, @RequestParam(value = "date", required = false) String searchDate, @RequestParam("manager") String managerEmail) {

        Gson gson = new Gson();
        Project searchProject = gson.fromJson(project, Project.class);

        logger.info("Search Projects for Manager.");
        return new ResponseEntity<>(projectService.searchProjectsForManager(managerEmail, searchProject, searchDate), HttpStatus.OK);
    }
}
