package com.stackroute.timetrackerservice.repo;


import com.stackroute.timetrackerservice.model.DailyTracker;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DailyTimeTrackerRepository extends ElasticsearchRepository<DailyTracker, String> {

    List<DailyTracker> findByDate(Long date);

    List<DailyTracker> findByDateGreaterThanEqualAndDateLessThanEqualAndEmployeeEmail(@NonNull Long fromDate, @NonNull Long toDate, @NonNull String employeeEmail);

    List<DailyTracker> findByDateGreaterThanEqual(@NonNull Long fromDate);

    List<DailyTracker> findByEmployeeName(String employeeName);


    List<DailyTracker> findByEmployeeNameStartsWith(String employeeName);

    List<DailyTracker> findByEmployeeEmail(String employeeEmail);

    List<DailyTracker> findByEmployeeEmailStartsWith(String employeeEmail);

    int countDistinctByEmployeeName(@NonNull String employeeName);

    long countByEmployeeEmail(@NonNull String employeeEmail);

    long countByDate(@NonNull Long date);

    Optional<DailyTracker> findByEmployeeEmailAndDate(@NonNull String employeeEmail, @NonNull Long date);



}
