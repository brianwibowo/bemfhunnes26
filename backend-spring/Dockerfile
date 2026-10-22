FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"
COPY --from=build /src/target/bemfhunnes-api-0.2.0.jar /app/app.jar
RUN mkdir -p /app/data /app/uploads
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
