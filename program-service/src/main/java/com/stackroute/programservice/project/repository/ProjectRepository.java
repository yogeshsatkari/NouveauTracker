package com.stackroute.programservice.project.repository;

import com.stackroute.programservice.project.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends MongoRepository<Project, Long> {

    Project findByProjectName(String projectName);
}