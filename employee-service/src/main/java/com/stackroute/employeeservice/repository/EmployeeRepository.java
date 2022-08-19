package com.stackroute.employeeservice.repository;


import com.stackroute.employeeservice.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

    @Query("{ 'role' : ?0 }")
    List<Employee> findEmployeesByRole(String role);

    @Query("{ 'managerEmailId' : ?0 }")
    List<Employee> findEmployeesWorkingForAParticularManager(String managerEmailId);
}
