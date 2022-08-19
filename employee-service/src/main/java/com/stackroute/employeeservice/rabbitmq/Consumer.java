package com.stackroute.employeeservice.rabbitmq;

import com.stackroute.employeeservice.model.Employee;
import com.stackroute.employeeservice.model.EmployeeRole;
import com.stackroute.employeeservice.service.EmployeeService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class Consumer {

    @Autowired
    private EmployeeService employeeService;

    @RabbitListener(queues = "nouveautracker_queue")
    public void getDtoAndAddToDb(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setEmailId(employeeDTO.getEmailId());
        employee.setEmployeeName(employeeDTO.getEmployeeName());
        employee.setRole(EmployeeRole.EMPLOYEE);            //on registration default role is set to EMPLOYEE
        employeeService.register(employee);
    }
}
