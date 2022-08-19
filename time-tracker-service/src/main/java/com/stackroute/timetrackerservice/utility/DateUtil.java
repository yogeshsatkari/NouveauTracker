package com.stackroute.timetrackerservice.utility;

import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
@Slf4j
public class DateUtil {

    // convert milliseconds into the day of the week string
    public static String getDayOfWeek(long msecs) {
        GregorianCalendar cal = new GregorianCalendar();

        cal.setTime(new Date(msecs));

        int dow = cal.get(Calendar.DAY_OF_WEEK);

        switch (dow) {
            case Calendar.MONDAY:
                return "Monday";
            case Calendar.TUESDAY:
                return "Tuesday";
            case Calendar.WEDNESDAY:
                return "Wednesday";
            case Calendar.THURSDAY:
                return "Thursday";
            case Calendar.FRIDAY:
                return "Friday";
            case Calendar.SATURDAY:
                return "Saturday";
            case Calendar.SUNDAY:
                return "Sunday";
        }

        return "Unknown";
    }
    public static Long getToDate(){
        return new Date().getTime();
    }
    public static  Long getFromDate(){
        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int month = localDate.getMonthValue();
        int year=localDate.getYear();
        String date_string = "01-"+month+"-"+year;
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        Date fromDate = null;
        try {
            fromDate = formatter.parse(date_string);
        } catch (ParseException e) {
            log.info("Parse Exception");
        }
        assert fromDate != null;
        return fromDate.getTime();

    }
}
