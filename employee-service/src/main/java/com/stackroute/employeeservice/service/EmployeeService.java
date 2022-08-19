package com.stackroute.employeeservice.service;

import com.stackroute.employeeservice.model.Employee;
import com.stackroute.employeeservice.model.EmployeeRole;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EmployeeService {
    Employee register(Employee employee);

    Employee getEmployee(String emailId);

    List<Employee> getAllEmployees();

    List<String> getAllEmployeesEmailIds();

    List<Employee> getEmployeesByRole(String role);

    List<Employee> getEmployeesWorkingForAParticularManager(String managerEmailId);

    Employee updateUserProfileImage(String emailId, MultipartFile multipartFile) throws IOException;

    Employee updateRole(String emailId, EmployeeRole employeeRole);

    Employee updateManagerEmailId(String emailId, String managerEmailId);

}
