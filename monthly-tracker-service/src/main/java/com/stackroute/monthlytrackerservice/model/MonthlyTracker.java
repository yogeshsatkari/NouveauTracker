package com.stackroute.monthlytrackerservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.validation.constraints.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "monthlytracker", shards = 3)
public class MonthlyTracker {
    @Pattern(message = "Needs follow Regex Pattern", regexp = "^(.+)@(\\\\S+)-([A-Za-z]+)-(\\\\d{4})$")
    @NotNull(message = "Not Nullable")
    @Id
    private String monthlyTrackerId;

    @Email(message = "Email Pattern")
    @NotNull(message = "Not Nullable")
    private String employeeEmail;

    @Enumerated
    @NotNull(message = "Not Nullable")
    private Status status;

    @Positive(message = "Positive")
    @Max(message = "max Year", value = 2050)
    @Min(message = "min Year", value = 2021)
    @Column(nullable = false)
    @Digits(message = "Four Digits Allowed", integer = 4, fraction = 0)
    @NotNull(message = "Not Nullable")
    private int year;

    @NotNull(message = "Not Nullable")
    @Pattern(regexp = "(?:January|February|March|April|May|June|July|August|September|October|November|December)")
    private String monthName;

    @NotNull(message = "Not Nullable")
    private Long startDate;

    @NotNull(message = "Not Nullable")
    private Long endDate;

    private String remarks;

}