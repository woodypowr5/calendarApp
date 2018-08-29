# CalendarApp

Maven 3.x is required to build this project
The project has the following structure:

* calendarApp - parent project  
  * calendar-client - module that contains the AngularJS code  
  * calendar-server - module that contains the Java backend code  

## Development server

Client-only dev server: From within the calendar-client/src/main/web directory, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. NOTE: This requires a standard installation of Node.js.

Whole dev server: From within the root directory, run `mvn spring-boot:run` for a dev server.  Navigate to `http://localhost:8080/` to access the main page.

## Build

Run `mvn clean install` to build the project. This first builds the calendar-client module using npm. Node.js is not required to be installed prior to this build. Maven will download and install a temporary copy of Node.js v9.11.2 in the working directory. It then packages the client code into a jar. Next it builds the calendar-server module. It then pulls in the compiled client code and includes it in the packaged war file.  
The build artifacts will be stored in the `target/` directory of their respective modules.

## Running unit tests

Client: From within calendar-client/src/main/web, run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Server: Run `mvn clean test` to execute the unit tests for Java.

## Running end-to-end tests

From within calendar-client/src/main/web, run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
