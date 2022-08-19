package com.stackroute.emailservice.model;
import lombok.Data;

@Data
public class CustomEmailRequest
{
    private String to;
    private String subject;
    private String year;
    private String month;
    private String actionToBeTaken;
}
