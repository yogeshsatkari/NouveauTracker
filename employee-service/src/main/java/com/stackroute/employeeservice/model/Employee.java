package com.stackroute.employeeservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Employee {
    @Id
    private String emailId;
    private String employeeName;
    private String managerEmailId;
    private EmployeeRole role;
    private String profileImage;
}
