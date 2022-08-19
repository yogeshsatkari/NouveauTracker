package com.stackroute.timetrackerservice;


import com.stackroute.timetrackerservice.controller.DailyTrackerController;
import com.stackroute.timetrackerservice.exception.DailyTrackerAlreadyExistsException;
import com.stackroute.timetrackerservice.exception.InvalidDateFilterException;
import com.stackroute.timetrackerservice.model.DailyTracker;
import com.stackroute.timetrackerservice.model.LeaveType;
import com.stackroute.timetrackerservice.model.Log;
import com.stackroute.timetrackerservice.service.DailyTrackerServiceImpl;
import lombok.NoArgsConstructor;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
@NoArgsConstructor
public class DailyTimeTrackerControllerTests {

    protected DailyTracker dailyTracker;
    protected List<DailyTracker> dailyTrackerList;

    protected HashMap<String,String> pendingDailyTrackers;

    protected HashMap<String, AtomicInteger> logHours;

    @InjectMocks //NOPMD - suppressed DefaultPackage - TODO explain reason for suppression
    /* default */ DailyTrackerController dailyTrackerController = new DailyTrackerController(); //CONTROLLER //NOPMD - suppressed LongVariable - TODO explain reason for suppression
    @Mock //NOPMD - suppressed DefaultPackage - TODO explain reason for suppression
    /* default */ DailyTrackerServiceImpl dailyTrackerServiceImpl; //SERVICE //NOPMD - suppressed LongVariable - TODO explain reason for suppression

    @Before
    public void setUp() {
        dailyTracker = new DailyTracker(
                "1",1_656_613_800_000L,
                "email@gmail.com",
                "Sharan",
                List.of(new Log(), new Log()),
                LeaveType.NONE,
                0,
                "Good");
        dailyTrackerList = List.of(dailyTracker);
        pendingDailyTrackers=new HashMap<>();
        logHours=new HashMap<>();
    }

    @Test
    public void saveTest() throws DailyTrackerAlreadyExistsException {

        try {
            when(dailyTrackerServiceImpl.saveDailyTracker(dailyTracker)).thenReturn(dailyTracker);
        } catch (DailyTrackerAlreadyExistsException e) { //NOPMD - suppressed AvoidRethrowingException - TODO explain reason for suppression
            throw e;
        }

        Assert.assertEquals("Return value should contain a DailyTracker Object", dailyTrackerController.saveDailyTracker(dailyTracker), new ResponseEntity<>(dailyTracker, HttpStatus.CREATED));
    }

    @Test
    public void fetchTest() {
        final List<DailyTracker> dailyTrackerList = List.of(dailyTracker);
        when(dailyTrackerServiceImpl.getAllDailyTimeTracker()).thenReturn(dailyTrackerList);
        Assert.assertEquals("Return value should contain a List of DailyTracker Object", dailyTrackerController.fetchAllDailyTracker(), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchDailyTrackerByIdTest() {
        when(dailyTrackerServiceImpl.fetchById(anyString())).thenReturn(Optional.of(dailyTracker));

        Assert.assertEquals("Should return DailyTracker Object with given ID", dailyTrackerController.getDailyTrackerById("1"), new ResponseEntity<>(dailyTracker, HttpStatus.OK));
    }

    @Test
    public void updateTest() {
        when(dailyTrackerServiceImpl.updateById(dailyTracker)).thenReturn(Optional.of(dailyTracker));
        Assert.assertEquals("Should return String 'Updated'", dailyTrackerController.updateDailyTracker(dailyTracker), new ResponseEntity<>("Updated", HttpStatus.ACCEPTED));
    }

    @Test
    public void fetchDailyTrackerForPeriodTest() {
        when(dailyTrackerServiceImpl.getAllDailyTimeTrackerInDuration(anyString(), anyLong(), anyLong())).thenReturn(List.of(dailyTracker));
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchAllDailyTracker(anyString(), anyLong(), anyLong()), new ResponseEntity<>(List.of(dailyTracker), HttpStatus.OK));
    }

    @Test
    public void fetchByDateTest() {
        when(dailyTrackerServiceImpl.findByDate(anyLong())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchByDate(anyLong()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchFromDateTest() {
        when(dailyTrackerServiceImpl.fetchAllfromDate(anyLong())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchAllfromDate(anyLong()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchByEmployeeNameTest() {
        when(dailyTrackerServiceImpl.findByEmployeeName(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchByEmployeeName(anyString()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchByEmployeeNameStartsWithTest() {
        when(dailyTrackerServiceImpl.fetchAllemployeeNameStartsWith(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchAllemployeeNameStartsWith(anyString()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchByEmployeeEmailTest() {
        when(dailyTrackerServiceImpl.findByEmployeeEmail(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchByEmployeeEmail(anyString()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void fetchByEmployeeEmailStartsWithTest() {
        when(dailyTrackerServiceImpl.fetchAllEmployeeEmailStartsWith(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerController.fetchAllemployeeEmailStartsWith(anyString()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void countDailyTrackerOfEmployeeTest() {
        when(dailyTrackerServiceImpl.countDistinctByEmployeeName(anyString())).thenReturn(8);
        Assert.assertEquals("Should Return a Long Value", dailyTrackerController.countDistinctByEmployeeName(anyString()), new ResponseEntity<>(8, HttpStatus.OK));
    }


    @Test
    public void searchDailyTrackerTest() {
        when(dailyTrackerServiceImpl.searchDailyTracker(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should Return a List of DailyTrackers", dailyTrackerController.searchDailyTracker(anyString()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }
    @Test
    public void filterDailyTrackerTest() {
        try {
            when(dailyTrackerServiceImpl.filterDailyTracker(anyLong(),anyString(),anyString(),anyString(),anyLong(),anyLong())).thenReturn(dailyTrackerList);
        } catch (InvalidDateFilterException e) {
            throw new RuntimeException(e);
        }
        Assert.assertEquals("Should Return a List of DailyTrackers", dailyTrackerController.filterDailyTracker(anyLong(),anyString(),anyString(),anyString(),anyLong(),anyLong()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }
    @Test
    public void searchDailyTrackerWithDateRangeTest() {
        when(dailyTrackerServiceImpl.dateRange(anyLong(),anyLong())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should Return a List of DailyTrackers", dailyTrackerController.searchDailyTracker(anyLong(),anyLong()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }

    @Test
    public void dailyTrackersPendingTest() {
        when(dailyTrackerServiceImpl.getAllPendingDailyTracker()).thenReturn(pendingDailyTrackers);
        Assert.assertEquals("Should Return a HashMap of employee > dates", dailyTrackerController.dailyTrackersPending(), new ResponseEntity<>(pendingDailyTrackers, HttpStatus.OK));
    }

    @Test
    public void getprojectWorkHoursTest() {
        when(dailyTrackerServiceImpl.getProjectWorkHours()).thenReturn(logHours);
        Assert.assertEquals("Should Return a HashMap of project > hours", dailyTrackerController.getprojectWorkHours(), new ResponseEntity<>(logHours, HttpStatus.OK));
    }

    @Test
    public void getProjectWorkingHoursForEmployeeTest() {
        when(dailyTrackerServiceImpl.getProjectWorkHoursForEmployee(anyString(),anyString())).thenReturn(0);
        Assert.assertEquals("Should Return Hours worked by Employee on Project", dailyTrackerController.getProjectWorkingHoursForEmployee(anyString(),anyString()), new ResponseEntity<>(0, HttpStatus.OK));
    }

    @Test
    public void getProgramWorkHoursTest() {
        when(dailyTrackerServiceImpl.getProgramWorkHours()).thenReturn(logHours);
        Assert.assertEquals("Should Return Hours worked by Employee on Project", dailyTrackerController.getProgramWorkHours(), new ResponseEntity<>(logHours, HttpStatus.OK));
    }

    @Test
    public void getProgramWorkingHoursForEmployeeTest() {
        when(dailyTrackerServiceImpl.getProgramWorkHoursForEmployee(anyString(),anyString())).thenReturn(0);
        Assert.assertEquals("Should Return Hours worked by Employee on Project", dailyTrackerController.getProgramWorkingHoursForEmployee(anyString(),anyString()), new ResponseEntity<>(0, HttpStatus.OK));
    }

    @Test
    public void getDailyTrackerByMonthAndYearTest() {
        when(dailyTrackerServiceImpl.getDailyTrackerByMonthAndYear(anyInt(),anyInt())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should Return Hours worked by Employee on Project", dailyTrackerController.getDailyTrackerByMonthAndYear(anyInt(),anyInt()), new ResponseEntity<>(dailyTrackerList, HttpStatus.OK));
    }


}
