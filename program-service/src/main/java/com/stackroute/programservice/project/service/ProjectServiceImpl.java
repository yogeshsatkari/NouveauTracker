package com.stackroute.programservice.project.service;

import com.stackroute.programservice.project.exception.ProjectNotFoundException;
import com.stackroute.programservice.project.model.Member;
import com.stackroute.programservice.project.model.Project;
import com.stackroute.programservice.project.model.ProjectDatabaseSequence;
import com.stackroute.programservice.project.model.ProjectStatus;
import com.stackroute.programservice.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class ProjectServiceImpl implements ProjectService {

    ProjectRepository projectRepository;
    MongoTemplate mongoTemplate;
    MongoOperations mongoOperations;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, MongoTemplate mongoTemplate, MongoOperations mongoOperations) {
        this.projectRepository = projectRepository;
        this.mongoTemplate = mongoTemplate;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public long generateSequence(String sequenceName) {
        ProjectDatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(sequenceName)),
                new Update().inc("sequence", 1), options().returnNew(true).upsert(true), ProjectDatabaseSequence.class);

        return !Objects.isNull(counter) ? counter.getSequence() : 1;
    }

    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() throws ParseException {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        List<Project> projectList = mongoTemplate.find(query, Project.class);

        for (Project project : projectList) {

            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date today = simpleDateFormat.parse(simpleDateFormat.format(new Date()));
            long todayInMillis = today.getTime();

            if ((project.getStartDate() < System.currentTimeMillis() || project.getStartDate() == todayInMillis) && project.getEndDate() > System.currentTimeMillis() || project.getEndDate() == todayInMillis) {
                project.setProjectStatus(ProjectStatus.ACTIVE);
            } else {
                project.setProjectStatus(ProjectStatus.INACTIVE);
            }
        }

        projectRepository.saveAll(projectList);
        return projectList;
    }

    @Override
    public List<Project> getAllActiveProjectsOnParticularDate(String memberEmail, long dateInMillis) {
        List<Project> projectList = projectRepository.findAll();
        List<Project> activeProjects = new ArrayList<>();

        for (Project project : projectList) {

            if ((dateInMillis > project.getStartDate() || project.getStartDate() == dateInMillis) && (dateInMillis < project.getEndDate() || project.getEndDate() == dateInMillis)) {
                List<Member> projectMembers = project.getMembersList();

                if (projectMembers != null) {
                    projectMembers.forEach(member -> {
                        if (member.getMemberEmailId().equals(memberEmail)) {
                            activeProjects.add(project);
                        }
                    });
                }
            }
        }
        return activeProjects;
    }

    @Override
    public List<Project> getProjectByManager(String managerEmail) {
        Query query = new Query();
        query.addCriteria(where("managerEmailId").is(managerEmail));
        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Project.class);
    }

    @Override
    public String deleteProject(String projectName) throws ProjectNotFoundException {
        Project project = projectRepository.findByProjectName(projectName);

        if (project != null) {
            projectRepository.delete(project);
            return "Project Deleted.";
        } else {
            throw new ProjectNotFoundException();
        }
    }

    @Override
    public Project addMembersToProject(String projectName, List<String> memberList) throws ProjectNotFoundException {
        Project savedProject = projectRepository.findByProjectName(projectName);

        List<Member> addMembersList = new ArrayList<>();

        if (savedProject != null) {

            memberList.forEach(m -> {
                Member member = new Member();
                member.setMemberEmailId(m.trim());
                member.setStartDate(savedProject.getStartDate());
                member.setEndDate(savedProject.getEndDate());
                addMembersList.add(member);
            });

            List<Member> existingMembersList = new ArrayList<>(savedProject.getMembersList());
            Set<Member> memberSet = new HashSet<>(existingMembersList);

            memberSet.addAll(addMembersList);

            List<Member> finalMemberList = new ArrayList<>(memberSet);

            savedProject.setMembersList(finalMemberList);
            return projectRepository.save(savedProject);
        } else {
            throw new ProjectNotFoundException();
        }
    }

    @Override
    public Project removeMembersFromProject(String projectName, String memberEmail) throws ProjectNotFoundException {
        Project project = projectRepository.findByProjectName(projectName);

        if (project != null) {
            List<Member> existingMembersList = project.getMembersList();

            for (int i = 0; i < existingMembersList.size(); i++) {

                if (existingMembersList.get(i).getMemberEmailId().equals(memberEmail)) {
                    existingMembersList.remove(i);
                    break;
                }
            }

            return projectRepository.save(project);
        } else {
            throw new ProjectNotFoundException();
        }
    }

    @Override
    public Project getProjectByName(String projectName) {
        return projectRepository.findByProjectName(projectName);
    }

    @Override
    public List<Project> getProjectByStatus(String projectStatus) {
        Query query = new Query();
        query.addCriteria(where("projectStatus").is(projectStatus));
        return mongoTemplate.find(query, Project.class);
    }

    @Override
    public List<Project> searchProjects(Project project, String searchDate) {
        Query query = new Query();

        if (project.getProjectName() != null) {
            query.addCriteria(where("projectName").regex("^" + project.getProjectName()));
        }

        if (project.getManagerEmailId() != null) {
            query.addCriteria(where("managerEmailId").is(project.getManagerEmailId()));
        }

        if (searchDate != null) {
            long dateSearch = Long.parseLong(searchDate);

            query.addCriteria(where("startDate").lte(dateSearch));
            query.addCriteria(where("endDate").gte(dateSearch));
        }

        if (project.getProjectStatus() != null) {
            query.addCriteria(where("projectStatus").is(project.getProjectStatus()));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Project.class);
    }

    @Override
    public List<Project> searchProjectsForManager(String managerEmail, Project project, String searchDate) {
        Query query = new Query();

        query.addCriteria(where("managerEmailId").is(managerEmail));

        if (project.getProjectName() != null) {
            query.addCriteria(where("projectName").regex("^" + project.getProjectName()));
        }

        if (project.getProjectStatus() != null) {
            query.addCriteria(where("projectStatus").is(project.getProjectStatus()));
        }

        if (searchDate != null) {
            long dateSearch = Long.parseLong(searchDate);

            query.addCriteria(where("startDate").lte(dateSearch));
            query.addCriteria(where("endDate").gte(dateSearch));

        }

        query.with(Sort.by(Sort.Direction.DESC, "createdOn"));
        return mongoTemplate.find(query, Project.class);
    }
}
