package com.stackroute.monthlytrackerservice.service;

import com.stackroute.monthlytrackerservice.exception.MonthlyTrackerAlreadyExistsException;
import com.stackroute.monthlytrackerservice.model.MonthlyTracker;
import com.stackroute.monthlytrackerservice.model.Status;
import com.stackroute.monthlytrackerservice.repo.MonthlyTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MonthlyTrackerServiceImpl implements MonthlyTrackerService {
    MonthlyTrackerRepository monthlyTrackerRepository;
    ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    public MonthlyTrackerServiceImpl(MonthlyTrackerRepository monthlyTrackerRepository, ElasticsearchRestTemplate elasticsearchRestTemplate) {
        this.monthlyTrackerRepository = monthlyTrackerRepository;
        this.elasticsearchRestTemplate = elasticsearchRestTemplate;
    }

    @Override
    public MonthlyTracker saveMonthlyTracker(MonthlyTracker MonthlyTracker) throws MonthlyTrackerAlreadyExistsException { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerRepository.existsById(MonthlyTracker.getMonthlyTrackerId())) {
            throw new MonthlyTrackerAlreadyExistsException();
        }
        return monthlyTrackerRepository.save(MonthlyTracker);
    }

    @Override
    public List<MonthlyTracker> getAllDailyTimeTracker() {
        final List<MonthlyTracker> MonthlyTrackerList = new ArrayList<>();

        monthlyTrackerRepository.findAll().forEach(MonthlyTrackerList::add);

        return MonthlyTrackerList;
    }

    @Override
    public Optional<MonthlyTracker> fetchById(String MonthlyTrackerID) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        return monthlyTrackerRepository.findById(MonthlyTrackerID);
    }

    @Override
    public Optional<MonthlyTracker> updateById(String monthlyTrackerID, String status) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerRepository.existsById(monthlyTrackerID)) {
            Optional<MonthlyTracker> optMonthlyTracker=monthlyTrackerRepository.findById(monthlyTrackerID);
            MonthlyTracker monthlyTracker= optMonthlyTracker.orElse(null);
            assert monthlyTracker != null;
            monthlyTracker.setStatus(Status.valueOf(status));
            return Optional.of(monthlyTrackerRepository.save(monthlyTracker)); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        }
        return Optional.empty();
    }
    @Override
    public Optional<MonthlyTracker> updateRemarksById(String monthlyTrackerID, String remarks) { //NOPMD - suppressed MethodArgumentCouldBeFinal - TODO explain reason for suppression
        if (monthlyTrackerRepository.existsById(monthlyTrackerID)) {
            Optional<MonthlyTracker> optMonthlyTracker=monthlyTrackerRepository.findById(monthlyTrackerID);
            MonthlyTracker monthlyTracker= optMonthlyTracker.orElse(null);
            assert monthlyTracker != null;
            monthlyTracker.setRemarks(remarks);
            return Optional.of(monthlyTrackerRepository.save(monthlyTracker)); //NOPMD - suppressed OnlyOneReturn - TODO explain reason for suppression
        }
        return Optional.empty();
    }
    @Override
    public List<MonthlyTracker> getAllDailyTimeTrackerfortheMonthAndYear(String month, String year) {
        final List<MonthlyTracker> MonthlyTrackerList = new ArrayList<>();
        monthlyTrackerRepository.findByMonthNameAndYear(month, year).forEach(MonthlyTrackerList::add);

        return MonthlyTrackerList;
    }

}
