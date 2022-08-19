package com.stackroute.monthlytrackerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class MonthlyTrackerServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(MonthlyTrackerServiceApplication.class, args);
    }

}
