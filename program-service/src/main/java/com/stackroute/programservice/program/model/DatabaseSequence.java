package com.stackroute.programservice.program.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class DatabaseSequence {
    @Id
    private String id;
    private long sequence;
}
