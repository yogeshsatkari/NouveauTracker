FROM openjdk:11
ADD ./target/employee-service-0.0.1-SNAPSHOT.jar /usr/src/employee-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "employee-service-0.0.1-SNAPSHOT.jar"]
