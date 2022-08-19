package com.stackroute.timetrackerservice.exception;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Either Filter with one Specific Date (OR) use From and To Dates to specify the period")
public class InvalidDateFilterException extends Exception {
}
