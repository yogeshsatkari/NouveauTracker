package com.stackroute.timetrackerservice.controller;


import com.stackroute.timetrackerservice.exception.DailyTrackerAlreadyExistsException;
import com.stackroute.timetrackerservice.exception.InvalidDateFilterException;
import com.stackroute.timetrackerservice.model.DailyTracker;
import com.stackroute.timetrackerservice.service.DailyTrackerService;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1")
@RestController
@RefreshScope
@Slf4j
@NoArgsConstructor
public class DailyTrackerController {

    @Value("${submissionDate}")
    String submissionDate;
    DailyTrackerService dailyTrackerService;


    @Autowired
    public DailyTrackerController(DailyTrackerService dailyTrackerService) {
        this.dailyTrackerService = dailyTrackerService;
    }

    @GetMapping("/submissiondate")
    public String getSubmissionDate() {
        return submissionDate;
    }

    //   Test Connection
    @GetMapping("/")
    public String connected() {
        return "Connected";
    }


    //    Save DailyTracker API
    @PostMapping("/dailytracker")
    public ResponseEntity<?> saveDailyTracker(@RequestBody DailyTracker dailyTracker) throws DailyTrackerAlreadyExistsException { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression

        return new ResponseEntity<>(dailyTrackerService.saveDailyTracker(dailyTracker), HttpStatus.OK);
    }

    //    Fetch All DailyTracker API
    @GetMapping("/dailytrackers")
    public ResponseEntity<?> fetchAllDailyTracker() {
        return new ResponseEntity<>(dailyTrackerService.getAllDailyTimeTracker(), HttpStatus.OK);
    }


    //    Fetch DailyTracker by ID API
    @GetMapping("/dailytracker")
    public ResponseEntity<?> getDailyTrackerById(@RequestParam String dailyTrackerID) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (dailyTrackerService.fetchById(dailyTrackerID).isPresent()) {
            return new ResponseEntity<>(dailyTrackerService.fetchById(dailyTrackerID).get(), HttpStatus.OK); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        } else {
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
    }

    //    Update DailyTracker by ID API
    @PutMapping("/dailytracker")
    public ResponseEntity<?> updateDailyTracker(@RequestBody DailyTracker dailyTracker) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (dailyTrackerService.updateById(dailyTracker).isPresent()) {
            return new ResponseEntity<>("Updated", HttpStatus.OK); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        } else {
            return new ResponseEntity<>("Not Updated", HttpStatus.NOT_FOUND);
        }
    }


    //    Fetch DailyTracker of a Employee between given Dates API
    @GetMapping("/employee/dailytrackers/period")
    public ResponseEntity<?> fetchAllDailyTracker(@RequestParam String employeeEmail, @RequestParam Long fromDate, @RequestParam Long toDate) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        return new ResponseEntity<>(dailyTrackerService.getAllDailyTimeTrackerInDuration(employeeEmail, fromDate, toDate), HttpStatus.OK);
    }

    //    Fetch All DailyTracker in given Date
    @GetMapping("/dailytrackers/date")
    public ResponseEntity<?> fetchByDate(@RequestParam Long date) {
        return new ResponseEntity<>(dailyTrackerService.findByDate(date), HttpStatus.OK);
    }

    //    Fetch All DailyTracker from Date
    @GetMapping("/dailytrackers/date/from")
    public ResponseEntity<?> fetchAllfromDate(@RequestParam Long fromDate) {
        return new ResponseEntity<>(dailyTrackerService.fetchAllfromDate(fromDate), HttpStatus.OK);
    }

    //    Fetch All DailyTracker with given employeeName
    @GetMapping("/dailytrackers/name")
    public ResponseEntity<?> fetchByEmployeeName(@RequestParam(required = false) String employeeName) {
        return new ResponseEntity<>(dailyTrackerService.findByEmployeeName(employeeName), HttpStatus.OK);
    }

    //    Fetch All DailyTracker where employeeName startswith
    @GetMapping("/dailytrackers/name/startswith")
    public ResponseEntity<?> fetchAllemployeeNameStartsWith(@RequestParam String employeeName) {
        return new ResponseEntity<>(dailyTrackerService.fetchAllemployeeNameStartsWith(employeeName), HttpStatus.OK);
    }

    //    Fetch All DailyTracker with given employeeEmail
    @GetMapping("/dailytrackers/email")
    public ResponseEntity<?> fetchByEmployeeEmail(@RequestParam(required = false) String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.findByEmployeeEmail(employeeEmail), HttpStatus.OK);
    }

    //    Fetch All DailyTracker where employeeEmail startswith
    @GetMapping("/dailytrackers/email/startswith")
    public ResponseEntity<?> fetchAllemployeeEmailStartsWith(@RequestParam String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.fetchAllEmployeeEmailStartsWith(employeeEmail), HttpStatus.OK);
    }

    //    Count All DailyTracker with employeeName
    @GetMapping("/dailytrackers/name/count")
    public ResponseEntity<?> countDistinctByEmployeeName(@RequestParam String employeeName) {
        return new ResponseEntity<>(dailyTrackerService.countDistinctByEmployeeName(employeeName), HttpStatus.OK);
    }

    //Search Daily Tracker by employee Email, employee Name, Remarks
    @GetMapping("/dailytrackers/search")
    public ResponseEntity<?> searchDailyTracker(@RequestParam String text) {
        return new ResponseEntity<>(dailyTrackerService.searchDailyTracker(text), HttpStatus.OK);
    }

    //Filter Daily Tracker by Date or from & to Date, Name, Email, Remarks
    @GetMapping("/dailytrackers/filter")
    public ResponseEntity<?> filterDailyTracker(@RequestParam(required = false) Long date, @RequestParam(required = false) String name, @RequestParam(required = false) String email, @RequestParam(required = false) String remarks, @RequestParam(required = false) Long from, @RequestParam(required = false) Long to) {
        try {
            return new ResponseEntity<>(dailyTrackerService.filterDailyTracker(date, name, email, remarks, from, to), HttpStatus.OK);
        } catch (InvalidDateFilterException e) {
            return new ResponseEntity<>(new InvalidDateFilterException(), HttpStatus.BAD_REQUEST);
        }
    }

    //Fetch DailyTrackers in given Date Range
    @GetMapping("/dailytrackers/daterange")
    public ResponseEntity<?> searchDailyTracker(@RequestParam Long from, @RequestParam Long to) {
        return new ResponseEntity<>(dailyTrackerService.dateRange(from, to), HttpStatus.OK);
    }

    //    Delete All DailyTracker
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        dailyTrackerService.deleteAll();
    }

    // Fetch All Pending and Incomplete DailyTrackers from the Start of the Month
    @GetMapping("/dailytrackers/pending")
    public ResponseEntity<?> dailyTrackersPending() {
        return new ResponseEntity<>(dailyTrackerService.getAllPendingDailyTracker(), HttpStatus.OK);
    }

    // Get Total Project Hours logged by All Employees
    @GetMapping("/project/hours")
    public ResponseEntity<?> getprojectWorkHours() {
        return new ResponseEntity<>(dailyTrackerService.getProjectWorkHours(), HttpStatus.OK);
    }

    // Get total Project Hours logged by a Employee on a Particular Project
    @GetMapping("project/loghours")
    public ResponseEntity<?> getProjectWorkingHoursForEmployee(@RequestParam(value = "project") String projectName, @RequestParam(value = "email") String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.getProjectWorkHoursForEmployee(projectName, employeeEmail), HttpStatus.OK);
    }

    // Get Total Program Hours logged by All Employees
    @GetMapping("/program/hours")
    public ResponseEntity<?> getProgramWorkHours() {
        return new ResponseEntity<>(dailyTrackerService.getProgramWorkHours(), HttpStatus.OK);
    }

    // Get total Program Hours logged by a Employee on a Particular Program
    @GetMapping("/program/loghours")
    public ResponseEntity<?> getProgramWorkingHoursForEmployee(@RequestParam(value = "program") String programName, @RequestParam(value = "email") String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.getProgramWorkHoursForEmployee(programName, employeeEmail), HttpStatus.OK);
    }

    // Get Daily Tracker with Month and Year
    @GetMapping("/dailytrackers/monthly")
    public ResponseEntity<?> getDailyTrackerByMonthAndYear(@RequestParam Integer month, @RequestParam Integer year) {
        return new ResponseEntity<>(dailyTrackerService.getDailyTrackerByMonthAndYear(month, year), HttpStatus.OK);
    }

    // Get List of total Program Hours logged by a Employee
    @GetMapping("/allprograms/hours")
    public ResponseEntity<?> getAllProgramWorkingHoursForEmployee(@RequestParam(value = "email") String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.getAllProgramWorkingHoursForEmployee(employeeEmail), HttpStatus.OK);
    }

    // Get List of total Project Hours logged by a Employee
    @GetMapping("/allprojects/hours")
    public ResponseEntity<?> getAllProjectWorkingHoursForEmployee(@RequestParam(value = "email") String employeeEmail) {
        return new ResponseEntity<>(dailyTrackerService.getAllProjectWorkingHoursForEmployee(employeeEmail), HttpStatus.OK);
    }
    @GetMapping("/manager/allprograms/hours")
    public ResponseEntity<?> getAllProgramWorkingHoursForManger(@RequestParam(value = "email") String managerEmail) {
        return new ResponseEntity<>(dailyTrackerService.getAllProgramWorkingHoursForManager(managerEmail), HttpStatus.OK);
    }
    @GetMapping("/manager/allprojects/hours")
    public ResponseEntity<?> getAllProjectWorkingHoursForManger(@RequestParam(value = "email") String managerEmail) {
        return new ResponseEntity<>(dailyTrackerService.getAllProjectWorkingHoursForManager(managerEmail), HttpStatus.OK);
    }

}
