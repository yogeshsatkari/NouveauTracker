package com.stackroute.emailservice;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableEurekaClient
@RefreshScope
@EnableScheduling
public class EmailServiceApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(EmailServiceApplication.class, args);
	}
}
