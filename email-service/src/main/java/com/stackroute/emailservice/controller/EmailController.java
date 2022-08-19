package com.stackroute.emailservice.controller;
import com.stackroute.emailservice.model.CustomEmailRequest;
import com.stackroute.emailservice.model.EmailResponse;
import com.stackroute.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class EmailController
{
    @Autowired
    private EmailService service;

    public EmailController() {
    }

    @Scheduled(cron = "${monthlyReminderDate}")
    @GetMapping("/sendemployeesmonthlyemail")
    public EmailResponse sendEmployeesMonthlyEmail()
    {
        EmailResponse emailResponse = service.sendEmployeesMonthlyEmail();
        return emailResponse;
    }

    @PostMapping("/sendemployeecustomemail")
    public ResponseEntity<?> sendEmployeeCustomEmail(@RequestBody CustomEmailRequest request)
    {
        if (service.sendEmployeeCustomEmail(request))
        {
            return new ResponseEntity<>("Email was Sent Successfully", HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Email failed to be send", HttpStatus.REQUEST_TIMEOUT);
        }
    }

    @Scheduled(cron = "${weeklyReminderDate}")
    @GetMapping("/sendemployeesreminderemail")
    public EmailResponse sendEmployeesReminderEmail()
    {
        EmailResponse emailResponse = service.sendEmployeesReminderEmail();
        return emailResponse;
    }
}
