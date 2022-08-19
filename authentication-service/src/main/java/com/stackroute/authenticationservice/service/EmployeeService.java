package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exceptions.EmployeeAlreadyExistsException;
import com.stackroute.authenticationservice.model.Employee;
import com.stackroute.authenticationservice.model.EmployeeProfile;

public interface EmployeeService {
    Employee register(EmployeeProfile employeeProfile) throws EmployeeAlreadyExistsException;

    Employee logIn(Employee employee);
}
