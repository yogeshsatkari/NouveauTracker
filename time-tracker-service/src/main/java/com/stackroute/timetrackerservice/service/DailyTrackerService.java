package com.stackroute.timetrackerservice.service;

import com.stackroute.timetrackerservice.dto.Employee;
import com.stackroute.timetrackerservice.exception.DailyTrackerAlreadyExistsException;
import com.stackroute.timetrackerservice.exception.InvalidDateFilterException;
import com.stackroute.timetrackerservice.model.DailyTracker;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

public interface DailyTrackerService {
    DailyTracker saveDailyTracker(DailyTracker dailyTracker) throws DailyTrackerAlreadyExistsException;

    List<DailyTracker> getAllDailyTimeTracker();

    Optional<DailyTracker> fetchById(String dailyTrackerID);

    Optional<DailyTracker> updateById(DailyTracker dailyTracker);

    List<DailyTracker> getAllDailyTimeTrackerInDuration(String employeeEmail, Long fromDate, Long toDate);

    List<DailyTracker> findByEmployeeName(String employeeName);

    List<DailyTracker> findByDate(Long date);

    List<DailyTracker> fetchAllfromDate(Long fromDate);

    List<DailyTracker> fetchAllemployeeNameStartsWith(String employeeName);

    List<DailyTracker> findByEmployeeEmail(String employeeEmail);

    List<DailyTracker> fetchAllEmployeeEmailStartsWith(String employeeEmail);

    void deleteAll();

    int countDistinctByEmployeeName(String employeeName);

    List<DailyTracker> searchDailyTracker(String searchField);

    List<DailyTracker> filterDailyTracker(Long date, String employeeName, String employeeEmail, String remarks, Long from, Long to) throws InvalidDateFilterException;

    List<DailyTracker> dateRange(Long from, Long to);

    HashMap<String, String> getAllPendingDailyTracker();

    HashMap<String, String> getPendingDailyTrackers(Long fromDate, Long toDate, List<Employee> employees);

    List<Employee> getEmployeeList();

    HashMap<String, AtomicInteger> getProjectWorkHours();

    Integer getProjectWorkHoursForEmployee(String projectName, String employeeEmail);

    List<DailyTracker> getDailyTrackerByMonthAndYear(Integer month,Integer year);

    HashMap<String, AtomicInteger> getProgramWorkHours();

    Integer getProgramWorkHoursForEmployee(String programName, String employeeEmail);

    HashMap<String,Integer> getAllProgramWorkingHoursForEmployee(String employeeEmail);
    HashMap<String,Integer> getAllProjectWorkingHoursForEmployee(String employeeEmail);

    HashMap<String, AtomicInteger> getAllProgramWorkingHoursForManager(String managerEmail);

    HashMap<String, AtomicInteger> getAllProjectWorkingHoursForManager(String managerEmail);
}
