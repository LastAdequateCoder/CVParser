# CV Parser Application

## Overview
The CV Parser Application is a web application designed to analyze candidate CVs and extract key information for reviewers. It consists of a backend built with Spring Boot and a frontend developed using React.

## Project Structure
The project is organized into two main directories: `backend` and `frontend`.

### Backend
- **src/main/java/com/example/cvparser**: Contains the main application code.
  - **CvParserApplication.java**: The entry point of the Spring Boot application.
  - **controller**: Contains classes that handle HTTP requests and responses.
  - **service**: Contains business logic for parsing CVs and processing data.
  - **model**: Contains data structure representations for candidates and CVs.
  - **repository**: Contains repository interfaces for data access.
- **src/main/resources**: Contains configuration and template files.
  - **application.properties**: Configuration properties for the Spring application.
  - **templates**: HTML templates for rendering views.
- **src/test/java/com/example/cvparser**: Contains unit tests for the application.

### Frontend
- **public/index.html**: The main HTML file for the React application.
- **src**: Contains the React application code.
  - **App.tsx**: The main component that sets up routing and layout.
  - **index.tsx**: The entry point that renders the App component.
  - **components**: Contains React components for uploading and displaying CVs.
    - **CVUpload.tsx**: Component for uploading CV files.
    - **CVDisplay.tsx**: Component for displaying parsed CV information.
    - **ReviewerPanel.tsx**: Component for reviewers to assess CVs.
  - **services/api.ts**: Functions for making API calls to the backend.
  - **tests**: Contains unit tests for the components.
    - **App.test.tsx**: Tests for the App component.
    - **CVUpload.test.tsx**: Tests for the CVUpload component.
  - **styles/App.css**: CSS styles for the application.

## Getting Started

### Prerequisites
- Java 11 or higher
- Node.js and npm
- Maven

### Backend Setup
1. Navigate to the `backend` directory.
2. Run `mvn clean install` to build the backend application.
3. Start the Spring Boot application using `mvn spring-boot:run`.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` to install the required dependencies.
3. Start the React application using `npm start`.

## Testing
- Backend tests can be run using Maven with the command `mvn test`.
- Frontend tests can be run using npm with the command `npm test`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.