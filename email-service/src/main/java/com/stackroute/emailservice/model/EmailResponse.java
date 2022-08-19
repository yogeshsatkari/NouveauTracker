package com.stackroute.emailservice.model;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailResponse
{
    private String message;
    private boolean status;
}
