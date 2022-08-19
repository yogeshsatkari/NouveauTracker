package com.stackroute.timetrackerservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Log {

    private String taskName;
    private LogType logType;
    private int logHours;
    private String startDate;
    private String selfStudyDetails;
}
