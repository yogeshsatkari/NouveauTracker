//package com.stackroute.authenticationservice.service;
//
//import com.stackroute.authenticationservice.model.Employee;
//import com.stackroute.authenticationservice.model.EmployeeProfile;
//import com.stackroute.authenticationservice.repository.EmployeeRepository;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.mockito.junit.jupiter.MockitoSettings;
//import org.mockito.quality.Strictness;
//
//import static jdk.internal.vm.compiler.word.LocationIdentity.any;
//import static org.junit.jupiter.api.Assertions.*;
//import static reactor.core.publisher.Mono.when;
//
//
//@ExtendWith(MockitoExtension.class)
//@MockitoSettings(strictness = Strictness.LENIENT)
//
//class EmployeeServiceImplTest {
//
//    @Mock
//    EmployeeRepository repo;
//    @InjectMocks
//    EmployeeServiceImpl employeeService;
//
//    private EmployeeProfile employeeProfile;
//    private Employee employee;
//
//    @BeforeEach
//    void setUp() {
//        employeeProfile = new EmployeeProfile("yogeshsatkari2@gmail.com","Password@1","Yogesh");
//        employee = new Employee("yogeshsatkari2@gmail.com","Password@1");
//    }
//
//    @AfterEach
//    void tearDown() {
//        employeeProfile = null;
//        employee = null;
//    }
//
//    @Test
//    void register() {
//        when(repo.existsById(employeeProfile.getEmailId())).thenReturn(false);
//
//    }
//
//    @Test
//    void logIn() {
//    }
//}