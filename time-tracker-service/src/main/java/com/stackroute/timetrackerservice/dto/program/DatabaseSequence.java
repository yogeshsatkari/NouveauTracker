package com.stackroute.timetrackerservice.dto.program;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class DatabaseSequence {
    @Id
    private String id;
    private long sequence;
}
