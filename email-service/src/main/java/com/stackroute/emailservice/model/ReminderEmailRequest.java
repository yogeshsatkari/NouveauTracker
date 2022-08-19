package com.stackroute.emailservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReminderEmailRequest
{
    private String emailId;
    private String dates;
}
