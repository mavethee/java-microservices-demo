# Etap 1: Budowanie aplikacji (ciężki obraz z Mavenem)
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
# Pobranie zależności z wyprzedzeniem (przyspiesza kolejne budowania)
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Etap 2: Uruchomienie (bardzo lekki obraz tylko ze środowiskiem uruchomieniowym)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
# Odpalamy aplikację
ENTRYPOINT ["java", "-jar", "app.jar"]