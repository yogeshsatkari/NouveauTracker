package com.stackroute.employeeservice;

import com.stackroute.employeeservice.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
@RefreshScope
public class EmployeeServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeServiceApplication.class, args);
    }


    @Bean
    FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean frb = new FilterRegistrationBean();
        frb.setFilter(new JwtFilter());
        frb.addUrlPatterns("/api/v1/employee/employee/*","/api/v1/employee/profileimage/*", "/api/v1/employee/role/*", "/api/v1/employee/manageremailid/*");    //,"/api/v1/employee/employees/*"
        return frb;
    }

//    @Bean
//    public FilterRegistrationBean filterRegistrationBean() {
//        final CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:4200");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return bean;
//    }

}

