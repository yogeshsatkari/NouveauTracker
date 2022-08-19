FROM openjdk
WORKDIR usr/lib
ADD ./target/email-service-0.0.1-SNAPSHOT.jar /usr/lib/email-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "email-service-0.0.1-SNAPSHOT.jar"]