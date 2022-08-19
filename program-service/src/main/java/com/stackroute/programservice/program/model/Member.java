package com.stackroute.programservice.program.model;

import lombok.*;

@Data
@NoArgsConstructor
public class Member {
    private String memberEmailId;
    private long startDate;
    private long endDate;
}
