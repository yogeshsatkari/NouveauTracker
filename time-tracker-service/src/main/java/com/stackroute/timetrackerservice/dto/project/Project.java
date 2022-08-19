package com.stackroute.timetrackerservice.dto.project;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Project {

    public static final String SEQUENCE_NAME = "projects_sequence";
    private long projectId;
    private String projectName;
    private int projectCode;
    private byte[] organizationBrandLogo;
    private long createdOn;
    private long startDate;
    private long endDate;
    private String managerEmailId;
    private List<Member> membersList;
    private ProjectStatus projectStatus;
    private int costCode;
    private int customerId;
}
