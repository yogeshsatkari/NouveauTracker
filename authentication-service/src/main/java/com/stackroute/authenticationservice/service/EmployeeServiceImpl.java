package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exceptions.EmployeeAlreadyExistsException;
import com.stackroute.authenticationservice.model.Employee;
import com.stackroute.authenticationservice.model.EmployeeProfile;
import com.stackroute.authenticationservice.rabbitmq.EmployeeDTO;
import com.stackroute.authenticationservice.rabbitmq.Producer;
import com.stackroute.authenticationservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    Producer producer;

    @Override
    public Employee register(EmployeeProfile employeeProfile) throws EmployeeAlreadyExistsException {
        if (employeeRepository.existsById(employeeProfile.getEmailId()) || employeeProfile.getPassword() == null) {
            throw new EmployeeAlreadyExistsException();
        }

        Employee employee = new Employee(employeeProfile.getEmailId(), employeeProfile.getPassword());
        employeeRepository.save(employee);       //sending user to mysql user table

        EmployeeDTO employeeDTO = new EmployeeDTO(employeeProfile.getEmailId(), employeeProfile.getEmployeeName());
        producer.sendMessageToMq(employeeDTO);      //sending userDTO to queue
        return employee;
    }

    @Override
    public Employee logIn(Employee employee) {
        Employee employee1 = employeeRepository.findUserByEmailIdAndPassword(employee.getEmailId(), employee.getPassword());
        return employee1;
    }
}
