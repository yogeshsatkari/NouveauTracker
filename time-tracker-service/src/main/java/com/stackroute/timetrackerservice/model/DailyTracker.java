package com.stackroute.timetrackerservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "dailytracker", shards = 3)
public class DailyTracker {
    @Id
    private String dailyTrackerID;
    @NotNull
    private long date;
    @NotNull
    private String employeeEmail;
    @NotNull
    private String employeeName; // NA in Frontend
    private List<Log> logs;
    @NotNull
    private LeaveType leaveType;
    @NotNull
    private int leaveHours; // NA in Frontend
    @NotNull
    private String remarks;

}
