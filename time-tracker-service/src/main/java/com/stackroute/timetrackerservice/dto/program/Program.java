package com.stackroute.timetrackerservice.dto.program;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class  Program {

    public static final String SEQUENCE_NAME = "programs_sequence";
    private long programId;
    private String programName;
    private int programCode;
    private String organizationName;
    private byte[] organizationBrandLogo;
    private String programType;
    private long createdOn;
    private long startDate;
    private long endDate;
    private String startTime;
    private String endTime;
    private String managerEmailId;
    private List<Member> membersList;
    private ProgramStatus programStatus;
    private int costCode;
    private int customerId;
}
