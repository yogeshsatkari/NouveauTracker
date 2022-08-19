package com.stackroute.monthlytrackerservice.exception;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@NoArgsConstructor
@ResponseStatus(code = HttpStatus.ALREADY_REPORTED, reason = "MonthlyTracker already exists for given Date and Employee")
public class MonthlyTrackerAlreadyExistsException extends Exception{
}
