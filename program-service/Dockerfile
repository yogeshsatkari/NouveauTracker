FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=programDB
ENV MONGO_URL=mongodb://localhost:27017/programDB
ADD ./target/program-service-0.0.1-SNAPSHOT.jar /usr/lib/program-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "program-service-0.0.1-SNAPSHOT.jar"]