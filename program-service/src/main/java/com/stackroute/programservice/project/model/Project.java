package com.stackroute.programservice.project.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Document
@Data
@NoArgsConstructor
public class Project {

    @Transient
    public static final String SEQUENCE_NAME = "projects_sequence";

    @Id
    private long projectId;
    @Indexed(unique = true)
    private String projectName;
    @Indexed(unique = true)
    private int projectCode;
    private byte[] organizationBrandLogo;
    private long createdOn;
    @NotNull(message = "Start Date cannot be null.")
    private long startDate;
    @NotNull(message = "End Date cannot be null.")
    private long endDate;
    @NotNull(message = "Manager EmailId cannot be null.")
    private String managerEmailId;
    private List<Member> membersList;
    private ProjectStatus projectStatus;
    @Indexed(unique = true)
    private int costCode;
    @Indexed(unique = true)
    private int customerId;
}
