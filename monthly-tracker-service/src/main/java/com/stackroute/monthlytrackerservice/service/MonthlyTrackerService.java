package com.stackroute.monthlytrackerservice.service;

import com.stackroute.monthlytrackerservice.exception.MonthlyTrackerAlreadyExistsException;
import com.stackroute.monthlytrackerservice.model.MonthlyTracker;

import java.util.List;
import java.util.Optional;

public interface MonthlyTrackerService {
    MonthlyTracker saveMonthlyTracker(MonthlyTracker MonthlyTracker) throws MonthlyTrackerAlreadyExistsException;

    List<MonthlyTracker> getAllDailyTimeTracker();

    Optional<MonthlyTracker> fetchById(String MonthlyTrackerID);

    Optional<MonthlyTracker> updateById(String monthlyTrackerID, String status);

    Optional<MonthlyTracker> updateRemarksById(String monthlyTrackerID, String remarks);

    List<MonthlyTracker> getAllDailyTimeTrackerfortheMonthAndYear(String month, String year);
}
