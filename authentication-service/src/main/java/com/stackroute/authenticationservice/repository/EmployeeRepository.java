package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Employee findUserByEmailIdAndPassword(String emailId, String password);
}
