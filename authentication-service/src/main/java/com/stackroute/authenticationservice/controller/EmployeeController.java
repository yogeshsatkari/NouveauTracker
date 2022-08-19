package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.exceptions.EmployeeAlreadyExistsException;
import com.stackroute.authenticationservice.model.Employee;
import com.stackroute.authenticationservice.model.EmployeeProfile;
import com.stackroute.authenticationservice.service.EmployeeService;
import com.stackroute.authenticationservice.service.SecurityTokenGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RefreshScope
@RequestMapping("/api/v1/account")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // http://localhost:8085/api/v1/account/register      [post]
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody EmployeeProfile employeeProfile) throws EmployeeAlreadyExistsException {
       logger.info("Register method accessed");
        try {
            Employee employee = employeeService.register(employeeProfile);
            employee.setPassword(null);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("tried registering with existing user credentials.");
            throw new EmployeeAlreadyExistsException();
        }
    }

    // http://localhost:8085/api/v1/account/login      [get]
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody Employee employee) {
        logger.info("Login method accessed");
        Employee resEmployee = employeeService.logIn(employee);
        if (resEmployee == null) {
            return new ResponseEntity("Login failed", HttpStatus.NOT_FOUND);
        }
        resEmployee.setPassword(null);
        return new ResponseEntity<>(securityTokenGenerator.generateToken(resEmployee), HttpStatus.OK);
    }

}
