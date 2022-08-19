package com.stackroute.monthlytrackerservice.controller;

import com.stackroute.monthlytrackerservice.exception.MonthlyTrackerAlreadyExistsException;
import com.stackroute.monthlytrackerservice.model.MonthlyTracker;
import com.stackroute.monthlytrackerservice.service.MonthlyTrackerService;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1")
@RestController
@RefreshScope
@Slf4j
@NoArgsConstructor
public class MonthlyController {
    MonthlyTrackerService monthlyTrackerService;

    @Autowired
    public MonthlyController(@Autowired MonthlyTrackerService monthlyTrackerService) {
        this.monthlyTrackerService = monthlyTrackerService;
    }

    //   Test Connection
    @GetMapping("/")
    public String connected() {
        return "Connected";
    }


    //    Save MonthlyTracker API
    @PostMapping("/monthlytracker")
    public ResponseEntity<?> saveMonthlyTracker(@RequestBody MonthlyTracker monthlyTracker) throws MonthlyTrackerAlreadyExistsException { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression

        return new ResponseEntity<>(monthlyTrackerService.saveMonthlyTracker(monthlyTracker), HttpStatus.OK);
    }

    //    Fetch All MonthlyTracker API
    @GetMapping("/monthlytrackers")
    public ResponseEntity<?> fetchAllMonthlyTracker() {
        return new ResponseEntity<>(monthlyTrackerService.getAllDailyTimeTracker(), HttpStatus.OK);

    }


    //    Fetch MonthlyTracker by ID API
    @GetMapping("/monthlytracker")
    public ResponseEntity<?> getMonthlyTrackerById(@RequestParam String monthlyTrackerID) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerService.fetchById(monthlyTrackerID).isPresent()) {
            return new ResponseEntity<>(monthlyTrackerService.fetchById(monthlyTrackerID).get(), HttpStatus.OK); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        } else {
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/monthlytracker")
    public ResponseEntity<?> updateMonthlyTrackerStatus(@RequestParam(value = "id") String monthlyTrackerID,@RequestParam String status) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerService.updateById(monthlyTrackerID,status).isPresent()) {
            return new ResponseEntity<>("Updated", HttpStatus.OK); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        } else {
            return new ResponseEntity<>("Not Updated", HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/monthlytracker/revert")
    public ResponseEntity<?> updateMonthlyTrackerRemarks(@RequestParam(value = "id") String monthlyTrackerID,@RequestParam String remarks) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerService.updateRemarksById(monthlyTrackerID,remarks).isPresent()) {
            return new ResponseEntity<>("Updated", HttpStatus.OK); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        } else {
            return new ResponseEntity<>("Not Updated", HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/filtermonthlytrackers")
    public ResponseEntity<?> fetchAllMonthlyTrackerInDuration(@RequestParam String month,@RequestParam String year) {
        return new ResponseEntity<>(monthlyTrackerService.getAllDailyTimeTrackerfortheMonthAndYear(month,year), HttpStatus.OK);

    }
}

