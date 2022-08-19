package com.stackroute.employeeservice.service;

import com.stackroute.employeeservice.model.Employee;
import com.stackroute.employeeservice.model.EmployeeRole;
import com.stackroute.employeeservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Employee register(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployee(String emailId) {
        Employee employee = employeeRepository.findById(emailId).get();
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> empList = employeeRepository.findAll();
        return empList;
    }

    @Override
    public List<String> getAllEmployeesEmailIds() {
        List<Employee> empList = employeeRepository.findAll();
        List<String> empEmailList = new ArrayList<>();
        empList.forEach(employee -> empEmailList.add(employee.getEmailId()));
        return empEmailList;
    }

    @Override
    public List<Employee> getEmployeesByRole(String role) {
        List<Employee> empList = employeeRepository.findEmployeesByRole(role);
        return empList;
    }

    @Override
    public List<Employee> getEmployeesWorkingForAParticularManager(String managerEmailId) {
        List<Employee> empList = employeeRepository.findEmployeesWorkingForAParticularManager(managerEmailId);
        return empList;
    }

    @Override
    public Employee updateUserProfileImage(String emailId, MultipartFile file) throws IOException {
//        String fileName = file.getOriginalFilename();
        Employee employee = employeeRepository.findById(emailId).get();
//        if (fileName.contains("..")) {                       // more restrictions could be applied to file type.
////            System.out.println("Not a valid file");
//        }
        employee.setProfileImage(Base64.getEncoder().encodeToString(file.getBytes()));
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateRole(String emailId, EmployeeRole employeeRole) {
        Employee employee = employeeRepository.findById(emailId).get();
        employee.setRole(employeeRole);
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateManagerEmailId(String emailId, String managerEmailId) {
        Employee employee = employeeRepository.findById(emailId).get();
        employee.setManagerEmailId(managerEmailId);
        return employeeRepository.save(employee);
    }

}
