package com.stackroute.programservice.program.exception;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No such Program Exists.")
@NoArgsConstructor
public class ProgramNotFoundException extends Exception {
    public ProgramNotFoundException(String message) {
        super(message);
    }
}
