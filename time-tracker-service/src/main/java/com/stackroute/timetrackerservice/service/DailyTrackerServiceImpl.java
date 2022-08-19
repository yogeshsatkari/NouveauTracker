package com.stackroute.timetrackerservice.service;


import com.stackroute.timetrackerservice.dto.Employee;
import com.stackroute.timetrackerservice.dto.program.Program;
import com.stackroute.timetrackerservice.dto.project.Project;
import com.stackroute.timetrackerservice.exception.DailyTrackerAlreadyExistsException;
import com.stackroute.timetrackerservice.exception.InvalidDateFilterException;
import com.stackroute.timetrackerservice.model.DailyTracker;
import com.stackroute.timetrackerservice.model.Log;
import com.stackroute.timetrackerservice.repo.DailyTimeTrackerRepository;
import com.stackroute.timetrackerservice.utility.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DailyTrackerServiceImpl implements DailyTrackerService {
    RestTemplate restTemplate;
    DailyTimeTrackerRepository dailyTimeTrackerRepository;
    ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    public DailyTrackerServiceImpl(RestTemplate restTemplate, DailyTimeTrackerRepository dailyTimeTrackerRepository, ElasticsearchRestTemplate elasticsearchRestTemplate) {
        this.restTemplate = restTemplate;
        this.dailyTimeTrackerRepository = dailyTimeTrackerRepository;
        this.elasticsearchRestTemplate = elasticsearchRestTemplate;
    }

    //    Save DailyTracker API
    @Override
    public DailyTracker saveDailyTracker(DailyTracker dailyTracker) throws DailyTrackerAlreadyExistsException { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (dailyTimeTrackerRepository.existsById(dailyTracker.getDailyTrackerID())) {
            throw new DailyTrackerAlreadyExistsException();
        }
        return dailyTimeTrackerRepository.save(dailyTracker);
    }

    //    Fetch All DailyTracker API
    @Override
    public List<DailyTracker> getAllDailyTimeTracker() {
        final List<DailyTracker> dailyTrackerList = new ArrayList<>();

        dailyTimeTrackerRepository.findAll().forEach(dailyTrackerList::add);

        return dailyTrackerList;
    }

    //    Fetch DailyTracker by ID API
    @Override
    public Optional<DailyTracker> fetchById(String dailyTrackerID) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        return dailyTimeTrackerRepository.findById(dailyTrackerID);
    }

    //    Update DailyTracker by ID API
    @Override
    public Optional<DailyTracker> updateById(DailyTracker dailyTracker) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (dailyTimeTrackerRepository.existsById(dailyTracker.getDailyTrackerID())) {
            return Optional.of(dailyTimeTrackerRepository.save(dailyTracker)); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        }
        return Optional.empty();
    }


    //    Fetch DailyTracker of a Employee between given Dates API
    @Override
    public List<DailyTracker> getAllDailyTimeTrackerInDuration(String employeeEmail, Long fromDate, Long toDate) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        return dailyTimeTrackerRepository.findByDateGreaterThanEqualAndDateLessThanEqualAndEmployeeEmail(fromDate, toDate, employeeEmail);
    }

    //    Fetch All DailyTracker by EmployeeName
    @Override
    public List<DailyTracker> findByEmployeeName(String employeeName) {
        return dailyTimeTrackerRepository.findByEmployeeName(employeeName);
    }

    //    Fetch All DailyTracker in given Date
    @Override
    public List<DailyTracker> findByDate(Long date) {
        return dailyTimeTrackerRepository.findByDate(date);
    }

    //    Fetch All DailyTracker from Date
    @Override
    public List<DailyTracker> fetchAllfromDate(Long fromDate) {
        return dailyTimeTrackerRepository.findByDateGreaterThanEqual(fromDate);
    }

    @Override
    //    Fetch All DailyTracker where employeeName startswith
    public List<DailyTracker> fetchAllemployeeNameStartsWith(String employeeName) {
        return dailyTimeTrackerRepository.findByEmployeeNameStartsWith(employeeName);
    }

    //    Fetch All DailyTracker with given employeeEmail
    @Override
    public List<DailyTracker> findByEmployeeEmail(String employeeEmail) {
        return dailyTimeTrackerRepository.findByEmployeeEmail(employeeEmail);
    }

    //    Fetch All DailyTracker where employeeEmail startswith
    @Override
    public List<DailyTracker> fetchAllEmployeeEmailStartsWith(String employeeEmail) {
        return dailyTimeTrackerRepository.findByEmployeeEmailStartsWith(employeeEmail);
    }

    //    Delete All DailyTracker
    @Override
    public void deleteAll() {
        dailyTimeTrackerRepository.deleteAll();
    }

    //    Count All DailyTracker with employeeName
    @Override
    public int countDistinctByEmployeeName(String employeeName) {
        return dailyTimeTrackerRepository.countDistinctByEmployeeName(employeeName);
    }

    //Search Daily Tracker by employee Email, employee Name, Remarks
    @Override
    public List<DailyTracker> searchDailyTracker(String searchField) {
        QueryBuilder queryBuilder = QueryBuilders.multiMatchQuery("*" + searchField + "*", "employeeName", "employeeEmail", "remarks");

        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withFilter(queryBuilder).build();
        List<SearchHit<DailyTracker>> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, DailyTracker.class).getSearchHits();
        List<DailyTracker> dailyTrackerList = new ArrayList<>();
        for (SearchHit<DailyTracker> dailyTracker :
                searchHits) {
            dailyTrackerList.add(dailyTracker.getContent());
        }
        return dailyTrackerList;

    }

    //Filter Daily Tracker by Date or from & to Date, Name, Email, Remarks
    @Override
    public List<DailyTracker> filterDailyTracker(Long date, String employeeName, String employeeEmail, String remarks, Long from, Long to) throws InvalidDateFilterException {
        if (from != null && to != null && date != null) {
            throw new InvalidDateFilterException();
        }
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery()
                .must(QueryBuilders.queryStringQuery("*" + (employeeName != null ? employeeName : "") + "*").field("employeeName"))
                .must(QueryBuilders.queryStringQuery("*" + (remarks != null ? remarks : "") + "*").field("remarks"))
                .must(QueryBuilders.queryStringQuery("*" + (employeeEmail != null ? employeeEmail : "") + "*").field("employeeEmail"));
        if (from != null && to != null) {
            boolQuery = boolQuery.must(QueryBuilders.rangeQuery("date").gte(from).lte(to));
        } else {
            boolQuery = boolQuery.must(QueryBuilders.matchQuery("date", date != null ? String.valueOf(date) : ""));
        }
        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withFilter(boolQuery).build();
        List<SearchHit<DailyTracker>> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, DailyTracker.class).getSearchHits();
        List<DailyTracker> dailyTrackerList = new ArrayList<>();
        for (SearchHit<DailyTracker> dailyTracker :
                searchHits) {
            dailyTrackerList.add(dailyTracker.getContent());
        }
        return dailyTrackerList;

    }

    //Fetch DailyTrackers in given Date Range
    @Override
    public List<DailyTracker> dateRange(Long from, Long to) {
        RangeQueryBuilder rangeQueryBuilder = QueryBuilders.
                rangeQuery("date").gte(from).lte(to);

        NativeSearchQuery nativeSearchQuery = new NativeSearchQueryBuilder().withFilter(rangeQueryBuilder).build();
        List<SearchHit<DailyTracker>> searchHits = elasticsearchRestTemplate.search(nativeSearchQuery, DailyTracker.class).getSearchHits();
        List<DailyTracker> dailyTrackerList = new ArrayList<>();
        for (SearchHit<DailyTracker> dailyTracker :
                searchHits) {
            dailyTrackerList.add(dailyTracker.getContent());
        }
        return dailyTrackerList;

    }

    // Fetch All Pending and Incomplete DailyTrackers from the Start of the Month
    @Override
    public HashMap<String,String> getAllPendingDailyTracker() {
        //From Date: Current Date
        Long fromDate=DateUtil.getFromDate();
        //To Date: Month 1st
        Long toDate=DateUtil.getToDate();
//        List of All Employees from Employee Service
        List<Employee> employees = getEmployeeList();
        //HashMap of All Employees with their pending DailyTracker Dates
        return getPendingDailyTrackers(fromDate, toDate, employees);
    }

    // Fetch All Pending and Incomplete DailyTrackers from the Start of the Month with fromDate and toDate and employeeList
    @Override
    public HashMap<String, String> getPendingDailyTrackers(Long fromDate, Long toDate, List<Employee> employees) {
        HashMap<String,String> pendingDailyTrackers=new HashMap<>();
        Long ONE_DAY_DURATION_IN_LONG = 86_400_000L;
        for (Long date = fromDate; date <= toDate; date=date+ ONE_DAY_DURATION_IN_LONG) {
            final Long dateToBeChecked=date;
            final String day= DateUtil.getDayOfWeek(dateToBeChecked);
            if (!day.equals("Saturday") && !day.equals("Sunday")){
                employees.stream()
                        .filter(
                                employee -> {
                                 boolean empty= dailyTimeTrackerRepository
                                            .findByEmployeeEmailAndDate(employee.getEmailId(), dateToBeChecked).isEmpty();
                                 if (!empty) {
                                     DailyTracker dailyTracker = dailyTimeTrackerRepository
                                             .findByEmployeeEmailAndDate(employee.getEmailId(), dateToBeChecked).get();
                                     assert  dailyTracker.getLogs().stream().map(Log::getLogHours).reduce(Integer::sum).isPresent();
                                     int loggedHours = dailyTracker.getLogs().stream().map(Log::getLogHours).reduce(Integer::sum).get();
                                     int totalHours = 8; // Total loggable hrs is 8 per Day
                                     return totalHours!=loggedHours+dailyTracker.getLeaveHours(); // Status
                                 }
                                 return empty;
                                }
                        )
                        .forEach(
                                employee -> {
                                            if (pendingDailyTrackers.containsKey(employee.getEmailId())){
                                               String dates= pendingDailyTrackers.get(employee.getEmailId())+","+dateToBeChecked;
                                               pendingDailyTrackers.put(employee.getEmailId(),dates);
                                            }else{
                                                pendingDailyTrackers.put(employee.getEmailId(),dateToBeChecked.toString());
                                            }
                                        });
            }
        }
        return pendingDailyTrackers;
    }

    // Get Employee List
    @Override
    public List<Employee> getEmployeeList() {
        Employee[] employeeList=restTemplate.getForObject("http://localhost:8080/employee-service/api/v1/employee/employees/", Employee[].class);
        assert employeeList != null;
        List<Employee> employees= Arrays.stream(employeeList).collect(Collectors.toUnmodifiableList());
        return employees;
    }

    // Get Total Project Hours logged by All Employees
    @Override
    public HashMap<String, AtomicInteger> getProjectWorkHours() {
        Project[] projects = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/project/status/ACTIVE", Project[].class);
        assert projects != null;
        log.info(Arrays.toString(projects));
        HashMap<String, AtomicInteger> projectWorkHours = new HashMap<>();
        List<Project> projectList = Arrays.stream(projects).collect(Collectors.toUnmodifiableList());
        projectList.forEach(project -> {
            log.info(project.getProjectName());
            AtomicInteger projectHours= new AtomicInteger();
            project.getMembersList().forEach(member -> {
                log.info(member.getMemberEmailId());
              projectHours.addAndGet(getProjectWorkHoursForEmployee(project.getProjectName(), member.getMemberEmailId()));
            });
            projectWorkHours.put(project.getProjectName(),projectHours);
        });
        log.info(projectWorkHours.toString());
        return projectWorkHours;
    }

    // Get total Project Hours logged by a Employee on a Particular Project
    @Override
    public Integer getProjectWorkHoursForEmployee(String projectName, String employeeEmail) {
        Project project=restTemplate.getForObject("http://localhost:8080/program-service/api/v1/project/"+projectName,Project.class);
        assert project != null;
        List<DailyTracker> dailyTrackers= getAllDailyTimeTrackerInDuration(employeeEmail,project.getStartDate(),project.getEndDate());
        List<Log> logList=new ArrayList<>();
        dailyTrackers.forEach(dailyTracker -> logList.addAll(dailyTracker.getLogs()));
        AtomicInteger logHours= new AtomicInteger();
        logList.stream().filter(log1 -> log1.getTaskName().equals(projectName)).forEach(log1 ->{
            logHours.addAndGet(log1.getLogHours());
        } );
        return logHours.get();
    }


    // Get Total Program Hours logged by All Employees
    @Override
    public HashMap<String, AtomicInteger> getProgramWorkHours() {
        Program[] programs = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/program/status/ACTIVE", Program[].class);
        assert programs != null;
        log.info(Arrays.toString(programs));
        HashMap<String, AtomicInteger> programWorkHours = new HashMap<>();
        List<Program> programList = Arrays.stream(programs).collect(Collectors.toUnmodifiableList());
        programList.forEach(program -> {
            log.info(program.getProgramName());
            AtomicInteger programHours= new AtomicInteger();
            program.getMembersList().forEach(member -> {
                log.info(member.getMemberEmailId());
                programHours.addAndGet(getProgramWorkHoursForEmployee(program.getProgramName(), member.getMemberEmailId()));
            });
            programWorkHours.put(program.getProgramName(),programHours);
        });
        log.info(programWorkHours.toString());
        return programWorkHours;
    }

    // Get total Program Hours logged by a Employee on a Particular Program
    @Override
    public Integer getProgramWorkHoursForEmployee(String programName, String employeeEmail) {
        Program program=restTemplate.getForObject("http://localhost:8080/program-service/api/v1/program/"+programName,Program.class);
        assert program != null;
        List<DailyTracker> dailyTrackers= getAllDailyTimeTrackerInDuration(employeeEmail,program.getStartDate(),program.getEndDate());
        List<Log> logList=new ArrayList<>();
        dailyTrackers.forEach(dailyTracker -> logList.addAll(dailyTracker.getLogs()));
        AtomicInteger logHours= new AtomicInteger();
        logList.stream().filter(log1 -> log1.getTaskName().equals(programName)).forEach(log1 ->{
            logHours.addAndGet(log1.getLogHours());
        } );
        return logHours.get();
    }

    // Get List of total Program Hours logged by a Employee
    @Override
    public HashMap<String, Integer> getAllProgramWorkingHoursForEmployee(String employeeEmail) {
        Program[] programs = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/programs/member/"+employeeEmail+"/"+new Date().getTime(), Program[].class);
        HashMap<String, Integer> programWorkingHours=new HashMap<>();
        assert programs != null;
        for (Program program : programs) {
            programWorkingHours.put(program.getProgramName(),getProgramWorkHoursForEmployee(program.getProgramName(),employeeEmail));
        }
        return programWorkingHours;
    }

    // Get List of total Project Hours logged by a Employee
    @Override
    public HashMap<String, Integer> getAllProjectWorkingHoursForEmployee(String employeeEmail) {
        Project[] projects = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/projects/member/"+employeeEmail+"/"+new Date().getTime(), Project[].class);
        HashMap<String, Integer> projectWorkingHours=new HashMap<>();
        assert projects != null;
        for (Project project : projects) {
            projectWorkingHours.put(project.getProjectName(),getProjectWorkHoursForEmployee(project.getProjectName(),employeeEmail));
        }
        return projectWorkingHours;
    }

    @Override
    public HashMap<String, AtomicInteger> getAllProgramWorkingHoursForManager(String managerEmail) {
        Program[] programs = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/programs/manager/"+managerEmail, Program[].class);
        HashMap<String, AtomicInteger> programsWorkingHours=new HashMap<>();
        assert programs != null;
        for (Program program : programs) {
            AtomicInteger totalLogHours= new AtomicInteger();
            program.getMembersList().forEach(employee -> {
              totalLogHours.addAndGet(getProgramWorkHoursForEmployee(program.getProgramName(), employee.getMemberEmailId()));
            });
            programsWorkingHours.put(program.getProgramName(),totalLogHours);
        }
        return programsWorkingHours;
    }

    @Override
    public HashMap<String, AtomicInteger> getAllProjectWorkingHoursForManager(String managerEmail) {
        Project[] projects = restTemplate.getForObject("http://localhost:8080/program-service/api/v1/projects/manager/"+managerEmail, Project[].class);
        HashMap<String, AtomicInteger> projectsWorkingHours=new HashMap<>();
        assert projects != null;
        for (Project project : projects) {
            AtomicInteger totalLogHours= new AtomicInteger();
            project.getMembersList().forEach(employee -> {
                totalLogHours.addAndGet(getProjectWorkHoursForEmployee(project.getProjectName(), employee.getMemberEmailId()));
            });
            projectsWorkingHours.put(project.getProjectName(),totalLogHours);
        }
        return projectsWorkingHours;
    }

    // Get Daily Tracker with Month and Year
    @Override
    public List<DailyTracker> getDailyTrackerByMonthAndYear(Integer month, Integer year) {
        List<DailyTracker> dailyTrackerList= getAllDailyTimeTracker();
        return dailyTrackerList.stream().filter(dailyTracker -> {
            Calendar c = Calendar.getInstance();
            c.setTimeInMillis(dailyTracker.getDate());
            return c.get(Calendar.MONTH) == month && c.get(Calendar.YEAR) == year;
        }).collect(Collectors.toUnmodifiableList());
    }


}
