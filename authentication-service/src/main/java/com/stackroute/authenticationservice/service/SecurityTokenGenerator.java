package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.model.Employee;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String, String> generateToken(Employee employee);
}
