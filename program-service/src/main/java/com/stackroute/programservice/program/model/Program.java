package com.stackroute.programservice.program.model;

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
public class  Program {

    @Transient
    public static final String SEQUENCE_NAME = "programs_sequence";

    @Id
    private long programId;
    @Indexed(unique = true)
    private String programName;
    @Indexed(unique = true)
    private int programCode;
    @NotNull(message = "Organization Name cannot be null.")
    private String organizationName;
    private byte[] organizationBrandLogo;
    @NotNull(message = "Program Type cannot be null.")
    private String programType;
    private long createdOn;
    @NotNull(message = "Start Date cannot be null.")
    private long startDate;
    @NotNull(message = "End Date cannot be null.")
    private long endDate;
    @NotNull(message = "Start Time cannot be null.")
    private String startTime;
    @NotNull(message = "End Time cannot be null.")
    private String endTime;
    @NotNull(message = "Manager EmailId cannot be null.")
    private String managerEmailId;
    private List<Member> membersList;
    private ProgramStatus programStatus;
    @Indexed(unique = true)
    private int costCode;
    @Indexed(unique = true)
    private int customerId;
}
