package com.stackroute.timetrackerservice;


import com.stackroute.timetrackerservice.exception.DailyTrackerAlreadyExistsException;
import com.stackroute.timetrackerservice.model.DailyTracker;
import com.stackroute.timetrackerservice.model.LeaveType;
import com.stackroute.timetrackerservice.model.Log;
import com.stackroute.timetrackerservice.repo.DailyTimeTrackerRepository;
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

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
@NoArgsConstructor
public class DailyTimeTrackerServiceTests {
    protected DailyTracker dailyTracker;
    protected List<DailyTracker> dailyTrackerList;
    @InjectMocks //NOPMD - suppressed DefaultPackage - TODO explain reason for suppression
    /* default */ DailyTrackerServiceImpl dailyTrackerServiceImpl; //SERVICE //NOPMD - suppressed LongVariable - TODO explain reason for suppression
    @Mock //NOPMD - suppressed DefaultPackage - TODO explain reason for suppression
    /* default */ DailyTimeTrackerRepository dailyTimeTrackerRepository; //RESPOSITORY //NOPMD - suppressed LongVariable - TODO explain reason for suppression

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

    }

    @Test
    public void saveTest() throws DailyTrackerAlreadyExistsException {
        when(dailyTimeTrackerRepository.save(dailyTracker)).thenReturn(dailyTracker);
        Assert.assertEquals("Should return saved DailyTracker Object", dailyTrackerServiceImpl.saveDailyTracker(dailyTracker), dailyTracker);
    }

    @Test
    public void saveFailureTest() {
        when(dailyTimeTrackerRepository.existsById(dailyTracker.getDailyTrackerID())).thenReturn(true);
        Assert.assertThrows(DailyTrackerAlreadyExistsException.class, () -> dailyTrackerServiceImpl.saveDailyTracker(dailyTracker));
    }

    @Test
    public void fetchTest() {
        final List<DailyTracker> dailyTrackerList = List.of(dailyTracker);
        when(dailyTimeTrackerRepository.findAll()).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return List of DailyTracker Objects", dailyTrackerServiceImpl.getAllDailyTimeTracker(), dailyTrackerList);
    }

    @Test
    public void fetchDailyTrackerByIdTest() {
        when(dailyTimeTrackerRepository.findById(anyString())).thenReturn(Optional.of(dailyTracker));

        Assert.assertEquals("Should return DailyTracker Object with given ID", dailyTrackerServiceImpl.fetchById("1"), Optional.of(dailyTracker));
    }

    @Test
    public void updateTest() {
        when(dailyTimeTrackerRepository.existsById(dailyTracker.getDailyTrackerID())).thenReturn(true);
        when(dailyTimeTrackerRepository.save(dailyTracker)).thenReturn(dailyTracker);
        Assert.assertEquals("Should return Optional of Updated Daily Tracker Objectr", dailyTrackerServiceImpl.updateById(dailyTracker), Optional.of(dailyTracker));
    }

    @Test
    public void updateFailureTest() {
        when(dailyTimeTrackerRepository.existsById(dailyTracker.getDailyTrackerID())).thenReturn(false);
        Assert.assertEquals("Should return Optional.empty()", dailyTrackerServiceImpl.updateById(dailyTracker), Optional.empty());
    }

    @Test
    public void fetchDailyTrackerForPeriodTest() {
        when(dailyTimeTrackerRepository.findByDateGreaterThanEqualAndDateLessThanEqualAndEmployeeEmail(anyLong(), anyLong(), anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.getAllDailyTimeTrackerInDuration(anyString(), anyLong(), anyLong()), dailyTrackerList);
    }

    @Test
    public void fetchByDateTest() {
        when(dailyTimeTrackerRepository.findByDate(anyLong())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.findByDate(anyLong()), dailyTrackerList);
    }

    @Test
    public void fetchFromDateTest() {
        when(dailyTimeTrackerRepository.findByDateGreaterThanEqual(anyLong())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.fetchAllfromDate(anyLong()), dailyTrackerList);
    }

    @Test
    public void fetchByEmployeeNameTest() {
        when(dailyTimeTrackerRepository.findByEmployeeName(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.findByEmployeeName(anyString()), dailyTrackerList);
    }

    @Test
    public void fetchByEmployeeNameStartsWithTest() {
        when(dailyTimeTrackerRepository.findByEmployeeNameStartsWith(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.fetchAllemployeeNameStartsWith(anyString()), dailyTrackerList);
    }

    @Test
    public void fetchByEmployeeEmailTest() {
        when(dailyTimeTrackerRepository.findByEmployeeEmail(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.findByEmployeeEmail(anyString()), dailyTrackerList);
    }

    @Test
    public void fetchByEmployeeEmailStartsWithTest() {
        when(dailyTimeTrackerRepository.findByEmployeeEmailStartsWith(anyString())).thenReturn(dailyTrackerList);
        Assert.assertEquals("Should return dailyTracker List", dailyTrackerServiceImpl.fetchAllEmployeeEmailStartsWith(anyString()), dailyTrackerList);
    }

    @Test
    public void countDailyTrackerOfEmployeeTest() {
        when(dailyTimeTrackerRepository.countDistinctByEmployeeName(anyString())).thenReturn(8);
        Assert.assertEquals("Should Return a Long Value", dailyTrackerServiceImpl.countDistinctByEmployeeName(anyString()), 8);
    }


}
