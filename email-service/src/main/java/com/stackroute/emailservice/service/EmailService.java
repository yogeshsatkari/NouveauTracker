package com.stackroute.emailservice.service;
import com.stackroute.emailservice.model.*;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.client.RestTemplate;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class EmailService
{
    @Autowired
    private JavaMailSender sender;
    @Autowired
    private Configuration config;

    public EmailResponse sendEmployeesMonthlyEmail()
    {
        MimeMessage message = sender.createMimeMessage();
        EmailResponse emailResponse = new EmailResponse();
        try
        {
            RestTemplate restTemplate = new RestTemplate();
            String listOfEmployeeEmailIdResponse = restTemplate.getForObject("http://localhost:8086/api/v1/employee/allemployeesemailids/", String.class);
            String listOfEmployeeEmailIdStr1 = listOfEmployeeEmailIdResponse.replace("[","");
            String listOfEmployeeEmailIdStr = listOfEmployeeEmailIdStr1.replace("]", "");
            String[] listOfEmployeeEmailId = listOfEmployeeEmailIdStr.split(",");
            for (int i = 0; i < listOfEmployeeEmailId.length; i++)
            {
                Map<String, Object> model = new HashMap<>();
                model.put("toAddr", listOfEmployeeEmailId[i]);
                String employeeEmailId = listOfEmployeeEmailId[i];
                // set mediaType
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
                Template t = config.getTemplate("email-template2.flth");
                String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
                helper.setTo(employeeEmailId);
                helper.setText(html, true);
                helper.setSubject("Email from Nouveau!");
                helper.setFrom("nouveautimetracker@gmail.com");
                sender.send(message);
                emailResponse.setMessage("Email sent to : " + employeeEmailId);
                emailResponse.setStatus(Boolean.TRUE);
            }
        }
        catch(MessagingException | IOException | TemplateException e)
        {
            emailResponse.setMessage("Email sending failure : " + e.getMessage());
            emailResponse.setStatus(Boolean.FALSE);
        }
        return emailResponse;
    }

    public Boolean sendEmployeeCustomEmail(CustomEmailRequest request)
    {
        String yearStr=request.getYear();
        String monthName=request.getMonth();
        Map<String, Object> model = new HashMap<>();
        model.put("year", yearStr);
        model.put("month", monthName);
        model.put("actionToBeTaken",request.getActionToBeTaken());
        String employeeEmailId = request.getTo();
        MimeMessage message = sender.createMimeMessage();
        try
        {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            Template t = config.getTemplate("email-template.flth");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
            helper.setTo(employeeEmailId);
            helper.setText(html, true);
            helper.setSubject(request.getSubject());
            helper.setFrom("nouveautimetracker@gmail.com");
            sender.send(message);
            return  true;
        }
        catch(MessagingException | IOException | TemplateException e)
        {
            return false;
        }
    }

    public EmailResponse sendEmployeesReminderEmail()
    {
        MimeMessage message = sender.createMimeMessage();
        EmailResponse emailResponse = new EmailResponse();
        RestTemplate restTemplate = new RestTemplate();
        String reminderEmailResponseStr = restTemplate.getForObject("http://localhost:8080/time-tracker-service/api/v1/dailytrackers/pending", String.class);
        try
        {
            Calendar calendar = Calendar.getInstance();
            int reminderYear = calendar.get(Calendar.YEAR);
            int reminderMonth = calendar.get(Calendar.MONTH);
            String reminderYearStr = String.valueOf(reminderYear);

            String monthName = "";
            DateFormatSymbols dfs = new DateFormatSymbols();
            String[] months = dfs.getMonths();
            if (reminderMonth >= 0 && reminderMonth <= 11)
            {
                monthName = months[reminderMonth];
            }

            String reminderEmailResponseStr1 = reminderEmailResponseStr.replace("{","");
            String reminderEmailResponseStr2 = reminderEmailResponseStr1.replace("}","");
            String[] listOfReminderEmailResponse = reminderEmailResponseStr2.split("\",");

            for (int i = 0; i < listOfReminderEmailResponse.length; i++)
            {
                String responseInString = new String(listOfReminderEmailResponse[i]);
                String response[] = responseInString.split(":", 2);
                String employeeEmailIdResp = response[0];
                String employeeEmailId = employeeEmailIdResp.replace("\"","");

                String dates = response[1].replace("\"","");
                String[] datesInMilliseconds = dates.split(",");
                DateFormat dateFormat = new SimpleDateFormat("dd");
                String datesInString = "";
                for (int j = 0; j < datesInMilliseconds.length; j++)
                {
                    long dateInLong = Long.parseLong(datesInMilliseconds[j]);
                    Date date = new Date(dateInLong);
                    datesInString = datesInString.concat(dateFormat.format(date)).concat(", ");
                }
                Map<String, Object> model = new HashMap<>();
                model.put("year", reminderYearStr);
                model.put("month", monthName);
                model.put("dates", datesInString);
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
                Template t = config.getTemplate("email-template3.flth");
                String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
                helper.setTo(employeeEmailId);
                helper.setText(html, true);
                helper.setSubject("Reminder from Nouveau!");
                helper.setFrom("nouveautimetracker@gmail.com");
                sender.send(message);
                emailResponse.setMessage("Email sent to : " + employeeEmailId);
                emailResponse.setStatus(Boolean.TRUE);
            }
        }
        catch(MessagingException | IOException | TemplateException e)
        {
            emailResponse.setMessage("Email sending failure : " + e.getMessage());
            emailResponse.setStatus(Boolean.FALSE);
        }
        return emailResponse;
    }
}
