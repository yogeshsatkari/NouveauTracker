package com.stackroute.timetrackerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private String emailId;
    private String employeeName;
    private String managerEmailId;
    private EmployeeRole role;
    private String profileImage;
}
