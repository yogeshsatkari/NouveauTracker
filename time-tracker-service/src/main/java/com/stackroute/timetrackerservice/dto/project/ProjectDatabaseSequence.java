package com.stackroute.timetrackerservice.dto.project;


import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ProjectDatabaseSequence {
    @Id
    private String id;
    private long sequence;
}
