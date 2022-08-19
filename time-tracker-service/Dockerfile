FROM openjdk
WORKDIR usr/lib
ADD ./target/time-tracker-service-0.0.1-SNAPSHOT.jar /usr/lib/time-tracker-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "time-tracker-service-0.0.1-SNAPSHOT.jar"]