package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.model.Employee;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator {

    @Override
    public Map<String, String> generateToken(Employee employee) {
        Map<String, String> map = new HashMap<>();
        long currentTimeInMilli = System.currentTimeMillis();
        String jwtToken = Jwts.builder()
                .setSubject(employee.getEmailId())
                .setIssuedAt(new Date(currentTimeInMilli))
                .signWith(SignatureAlgorithm.HS512, "mysecretkey")
//                .setExpiration(new Date(currentTimeInMilli+1200000))     //token will be valid for 20 minutes only.
                .compact();
        map.put("token", jwtToken);
        map.put("message", "Employee successfully logged in");
        map.put("emailId", employee.getEmailId());
//        map.put("role", employee.getRole());                          // role will be stored in mongoDB.
        return map;
    }
}
