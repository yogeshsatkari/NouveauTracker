package com.stackroute.programservice.project.service;

import com.stackroute.programservice.project.exception.ProjectNotFoundException;
import com.stackroute.programservice.project.model.Project;

import java.text.ParseException;
import java.util.List;

public interface ProjectService {
    long generateSequence(String sequence);

    Project addProject(Project project);

    Project getProjectByName(String projectName);

    List<Project> getAllProjects() throws ParseException;

    List<Project> getAllActiveProjectsOnParticularDate(String memberEmail, long dateInMillis);

    List<Project> getProjectByManager(String managerEmail);

    String deleteProject(String projectName) throws ProjectNotFoundException;

    Project addMembersToProject(String projectName, List<String> membersList) throws ProjectNotFoundException;

    Project removeMembersFromProject(String projectCode, String member) throws ProjectNotFoundException;

    List<Project> getProjectByStatus(String programStatus);

    List<Project> searchProjects(Project project, String searchDate);

    List<Project> searchProjectsForManager(String managerEmail, Project project, String searchDate);
}
