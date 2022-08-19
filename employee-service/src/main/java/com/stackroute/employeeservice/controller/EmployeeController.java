package com.stackroute.employeeservice.controller;

import com.stackroute.employeeservice.model.Employee;
import com.stackroute.employeeservice.model.EmployeeRole;
import com.stackroute.employeeservice.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//import javax.inject.Inject;
import java.io.IOException;
import java.util.List;


@RestController
@RefreshScope
@RequestMapping("/api/v1/employee")
public class EmployeeController {
//    @Inject
//    EmployeeService emp;
    @Autowired
    EmployeeService employeeService;

    Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // http://localhost:8086/api/v1/employee/employee/                [get]
    @GetMapping("/employee")
    public ResponseEntity<Employee> getEmployee(@RequestParam String emailid) {
        logger.info("getEmployee method accessed");
        return new ResponseEntity<>(employeeService.getEmployee(emailid), HttpStatus.OK);
    }

    // http://localhost:8086/api/v1/                 [get]
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        logger.info("getAllEmployees method accessed");
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }

    // http://localhost:8086/api/v1/employee/allemployeesemailids/                [get]
    @GetMapping("/allemployeesemailids")
    public ResponseEntity<List<String>> getAllEmployeesEmailIds() {
        logger.info("getAllEmployeesEmailIds method accessed");
        return new ResponseEntity<>(employeeService.getAllEmployeesEmailIds(), HttpStatus.OK);
    }

    // http://localhost:8086/api/v1/employee/byrole/                [get]
    @GetMapping("/byrole")
    public ResponseEntity<List<Employee>> getEmployeesByRole(@RequestParam String role) {
        logger.info("getEmployeesByRole method accessed");
        return new ResponseEntity<>(employeeService.getEmployeesByRole(role), HttpStatus.OK);
    }

    // http://localhost:8086/api/v1/employee/bymanageremailid/                [get]
    @GetMapping("/bymanageremailid")
    public ResponseEntity<List<Employee>> getEmployeesWorkingForAParticularManager(@RequestParam String manageremailid) {
        logger.info("getEmployeesWorkingForAParticularManager method accessed");
        return new ResponseEntity<>(employeeService.getEmployeesWorkingForAParticularManager(manageremailid), HttpStatus.OK);
    }


    // http://localhost:8086/api/v1/employee/profileimage/                [put]
    @PutMapping("/profileimage")
    public ResponseEntity<?> updateUserProfileImage(@RequestParam String emailid, @RequestParam MultipartFile file) throws IOException {
        logger.info("updateUserProfileImage method accessed");
        try {
            return new ResponseEntity<>(employeeService.updateUserProfileImage(emailid, file), HttpStatus.OK);
        } catch (IOException e) {
            logger.error("IOException thrown inside updateUserProfileImage method");
            return new ResponseEntity<>("file IOException thrown", HttpStatus.OK);
        }
    }

    // http://localhost:8086/api/v1/employee/role/                [put]
    @PutMapping("/role")
    public ResponseEntity<?> updateRole(@RequestParam String emailid, @RequestParam EmployeeRole employeeRole) {
        logger.info("updateRole method accessed");
        return new ResponseEntity<>(employeeService.updateRole(emailid, employeeRole), HttpStatus.OK);
    }


    // http://localhost:8086/api/v1/employee/manageremailid/                [put]
    @PutMapping("/manageremailid")
    public ResponseEntity<?> updateManagerEmailId(@RequestParam String emailid, @RequestParam String managerEmailId) {
        logger.info("updateManagerEmailId method accessed");
        return new ResponseEntity<>(employeeService.updateManagerEmailId(emailid, managerEmailId), HttpStatus.OK);
    }
}
