package com.stackroute.programservice.project.model;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Member {
    private String memberEmailId;
    private long startDate;
    private long endDate;
}
