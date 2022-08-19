package com.stackroute.monthlytrackerservice.repo;

import com.stackroute.monthlytrackerservice.model.MonthlyTracker;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonthlyTrackerRepository extends ElasticsearchRepository<MonthlyTracker, String> {
    List<MonthlyTracker> findByMonthNameAndYear(@NonNull String month, @NonNull String year);

}
